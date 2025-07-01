export function validateLogin(password: string): string | null {
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return null;
}
export function isValidDomainEmail(email: string): boolean {
  return email.endsWith('@usantoto.edu.co') || email.endsWith('@ustatunjaedu.co');
}