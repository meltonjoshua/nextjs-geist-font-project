import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable must be set in production');
  }
  return new TextEncoder().encode(secret || 'suffolk-cleaning-dev-secret-key-not-for-production');
}

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
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
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
