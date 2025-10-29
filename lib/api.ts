import { error } from "console";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://securepass-backend.vercel.app/api';

type JsonRecord = Record<string, unknown>;

async function apiFetch<TResponse = JsonRecord>(
  path: string,
  init: RequestInit = {}
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    ...init,
  });

  let data: unknown = null;
  const text = await response.text();
  console.log(text);
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    // Non-JSON response; keep raw text
    data = text as unknown;
  }

  if (!response.ok) {
    const extractedMessage =
      data && typeof data === 'object' && (data as JsonRecord) && 'message' in (data as JsonRecord)
        ? String((data as JsonRecord).message)
        : '';
    const message: string = extractedMessage || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as TResponse;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  // name: string;
  username: string;
  email: string;
  password: string;
  masterString: string;
}

export interface AuthResponse {
  token?: string;
  user?: JsonRecord;
  message?: string;
}

export interface MasterStringRequest{
  token?:string;
  masterString: string;
}

export async function login(request: LoginRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function signup(request: SignupRequest): Promise<AuthResponse> {
  console.log(request);
  return apiFetch<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export interface PasswordItem {
  id: string;
  website: string;
  username?: string;
  password?: string;
  category?: string;
  lastUsed?: string;
  strength?: 'weak' | 'medium' | 'strong';
}

export async function getMasterString(authToken?: string): Promise<MasterStringRequest>{
const token = authToken ?? (typeof window !== 'undefined' ? sessionStorage.getItem('auth_token') : null);
if(!token) throw new Error('Missing Auth Token');

return apiFetch<MasterStringRequest>('/masterkey', {
  headers: {
    Authorization : `${token}`,
  },
});
}

export async function getPasswords(authToken?: string): Promise<PasswordItem[]> {
  const token = authToken ?? (typeof window !== 'undefined' ? sessionStorage.getItem('auth_token') : null);
  if (!token) throw new Error('Missing auth token');

  return apiFetch<PasswordItem[]>('/passwords', {
    headers: {
      Authorization: `${token}`,
    },
  });
}