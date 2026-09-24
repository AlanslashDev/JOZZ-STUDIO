export interface ApiError extends Error {
  status?: number;
  details?: Record<string, string>;
}

const importMetaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
const apiBase = (importMetaEnv?.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init.headers },
    credentials: 'include',
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const error: ApiError = new Error(body?.error?.message || 'The request could not be completed.');
    error.status = response.status;
    error.details = body?.error?.details;
    throw error;
  }
  const body = await response.json();
  return body.data as T;
}

export interface PublicBootstrap {
  settings: Record<string, unknown>;
  services: unknown[];
  portfolio: unknown[];
  faqs: unknown[];
  navigation: unknown[];
  categories: string[];
  seo: Record<string, { title?: string; metaTitle?: string; metaDescription?: string; indexable?: boolean }>;
  updatedAt: string;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export const publicApi = {
  bootstrap: () => request<PublicBootstrap>('/public/bootstrap', { cache: 'no-store' }),
  submitEnquiry: (payload: EnquiryPayload) => request<{ received: boolean }>('/public/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
};
