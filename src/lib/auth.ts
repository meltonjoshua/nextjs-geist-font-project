import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'suffolk-cleaning-secret-key-2024'
);

export interface TokenPayload {
  id: string;
  email: string;
  role: 'admin' | 'contractor';
  name: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSession(request: NextRequest): Promise<TokenPayload | null> {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}
