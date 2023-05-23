import { SHA256 } from 'crypto-js';

export function HashPassword(password: string): string {
 
  const hashedPassword =  SHA256(password).toString();
  return hashedPassword;
}
