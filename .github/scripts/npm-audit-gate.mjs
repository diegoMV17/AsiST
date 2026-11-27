#!/usr/bin/env node
// Puerta de dependencias: falla si `npm audit` reporta avisos high o critical
// que no estén aceptados (con motivo y fecha de vencimiento) en la lista de excepciones.
// Uso: node npm-audit-gate.mjs <carpeta-del-paquete> <ruta-lista-excepciones>
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';

const BLOCKING_SEVERITIES = new Set(['high', 'critical']);
const ADVISORY_ID_PATTERN = /GHSA-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}/i;

function runNpmAudit(packageDir) {
  try {
    return execFileSync('npm', ['audit', '--json'], { cwd: packageDir, encoding: 'utf8' });
  } catch (error) {
    // npm audit sale con código distinto de 0 cuando hay hallazgos; el JSON sigue en stdout.
    if (typeof error.stdout === 'string' && error.stdout.length > 0) return error.stdout;
    throw error;
  }
}

function collectBlockingAdvisories(auditReport) {
  const advisories = new Map();
  for (const vulnerability of Object.values(auditReport.vulnerabilities ?? {})) {
    for (const source of vulnerability.via) {
      if (typeof source !== 'object' || !BLOCKING_SEVERITIES.has(source.severity)) continue;
      const id = source.url?.match(ADVISORY_ID_PATTERN)?.[0]?.toUpperCase() ?? String(source.source);
      advisories.set(id, { id, packageName: source.name, severity: source.severity, title: source.title, url: source.url });
    }
  }
  return [...advisories.values()];
}

function loadActiveExceptions(allowlistPath, packageDir, today) {
  const allowlist = JSON.parse(readFileSync(allowlistPath, 'utf8'));
  const entries = allowlist.packages?.[packageDir] ?? [];
  const active = new Map();
  const expired = [];
  for (const entry of entries) {
    if (!entry.id || !entry.reason || !entry.expires) {
      throw new Error(`Excepción inválida en ${allowlistPath}: requiere id, reason y expires (${JSON.stringify(entry)})`);
    }
    if (entry.expires < today) expired.push(entry);
    else active.set(entry.id.toUpperCase(), entry);
  }
  return { active, expired };
}

function formatRow(advisory, status) {
  return `| ${status} | ${advisory.severity} | \`${advisory.packageName}\` | [${advisory.id}](${advisory.url}) | ${advisory.title} |`;
}

function writeSummary(lines) {
  const text = `${lines.join('\n')}\n`;
  process.stdout.write(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
}

function main() {
  const [packageDir, allowlistPath] = process.argv.slice(2);
  if (!packageDir || !allowlistPath) throw new Error('Uso: npm-audit-gate.mjs <carpeta> <lista-excepciones>');

  const today = new Date().toISOString().slice(0, 10);
  const advisories = collectBlockingAdvisories(JSON.parse(runNpmAudit(packageDir)));
  const { active, expired } = loadActiveExceptions(allowlistPath, packageDir, today);
  const blocking = advisories.filter((advisory) => !active.has(advisory.id));
  const accepted = advisories.filter((advisory) => active.has(advisory.id));
  const unused = [...active.values()].filter((entry) => !advisories.some((advisory) => advisory.id === entry.id.toUpperCase()));

  const lines = [`### npm audit: \`${packageDir}\``, ''];
  if (advisories.length === 0) lines.push('Sin avisos high ni critical.');
  else {
    lines.push('| Estado | Severidad | Paquete | Aviso | Título |', '| --- | --- | --- | --- | --- |');
    lines.push(...blocking.map((advisory) => formatRow(advisory, '❌ bloquea')));
    lines.push(...accepted.map((advisory) => formatRow(advisory, `⚠️ aceptado hasta ${active.get(advisory.id).expires}`)));
  }
  for (const entry of expired) lines.push('', `Excepción vencida (${entry.expires}), ya no cuenta: ${entry.id}`);
  for (const entry of unused) lines.push('', `Excepción sin uso, puede borrarse: ${entry.id}`);
  writeSummary(lines);

  if (blocking.length > 0) {
    console.error(`::error::${blocking.length} aviso(s) high/critical sin excepción en ${packageDir}`);
    process.exitCode = 1;
  }
}

main();
