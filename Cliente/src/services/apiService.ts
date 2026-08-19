import Constants from 'expo-constants';
import { obtenerToken } from '../auth/authService';

const API_BASE = Constants.expoConfig?.extra?.PUBLIC_URL_API;

interface RequestOptions {
  auth?: boolean;
  params?: Record<string, any>;
  signal?: AbortSignal;
}

function buildUrl(path: string, params?: Record<string, any>): string {
  const url = `${API_BASE}/api/${path}`;
  if (!params) return url;
  const cleaned = Object.entries(params).reduce((acc, [k, v]) => {
    if (v !== undefined && v !== null && v !== '') acc[k] = String(v);
    return acc;
  }, {} as Record<string, string>);
  const query = new URLSearchParams(cleaned).toString();
  return query ? `${url}?${query}` : url;
}

async function buildHeaders(auth: boolean): Promise<Record<string, string>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = await obtenerToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.mensaje || 'Error en la solicitud');
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function request(method: string, path: string, body?: any, options: RequestOptions = {}) {
  const { auth = true, params, signal } = options;
  const url = buildUrl(path, params);
  const headers = await buildHeaders(auth);
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error en ${method} ${url}:`, error);
    throw error;
  }
}

export const apiService = {
  get: (path: string, options?: RequestOptions) => request('GET', path, undefined, options),
  post: (path: string, body?: any, options?: RequestOptions) => request('POST', path, body, options),
  put: (path: string, body?: any, options?: RequestOptions) => request('PUT', path, body, options),
  del: (path: string, options?: RequestOptions) => request('DELETE', path, undefined, options),

  getData: (path: string, options?: RequestOptions) => request('GET', path, undefined, options),
  getDataParam: (path: string, params: Record<string, any>, options?: RequestOptions) =>
    request('GET', path, undefined, { ...options, params }),
  getDataPost: (path: string, record: any, options?: RequestOptions) =>
    request('POST', path, record, options),
  create: (path: string, record: any, options?: RequestOptions) =>
    request('POST', path, record, options),
  update: (path: string, id: string, record: any, options?: RequestOptions) =>
    request('PUT', `${path}/${id}`, record, options),
  remove: (path: string, id: string, options?: RequestOptions) =>
    request('DELETE', `${path}/${id}`, undefined, options),
};

export default apiService;