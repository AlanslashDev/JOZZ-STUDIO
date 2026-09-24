import type { PublicBootstrap } from '../lib/api';

let csrfToken = '';

export interface CmsDocumentSummary {
  key: string;
  title: string;
  route: string;
  description: string;
  status: 'published' | 'draft';
  draftUpdatedAt?: string | null;
  publishedAt?: string | null;
}

export interface CmsRevision {
  id: number;
  action: string;
  createdAt: string;
  author?: string | null;
}

export interface CmsDocument {
  key: string;
  title: string;
  route: string;
  status: 'published' | 'draft';
  draft: Record<string, unknown>;
  published: Record<string, unknown>;
  draftUpdatedAt?: string | null;
  publishedAt?: string | null;
  revisions: CmsRevision[];
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (!(init.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (csrfToken) headers.set('X-CSRF-Token', csrfToken);
  const response = await fetch(`/api/v1${path}`, { ...init, headers, credentials: 'include' });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body?.error?.message || 'The request could not be completed.') as Error & { status?: number; details?: Record<string, string> };
    error.status = response.status;
    error.details = body?.error?.details;
    throw error;
  }
  return body.data as T;
}

export const adminApi = {
  session: async () => {
    const data = await request<{ admin: { username: string; role: string }; csrfToken: string }>('/admin/auth/me');
    csrfToken = data.csrfToken;
    return data.admin;
  },
  login: async (username: string, password: string) => {
    const data = await request<{ admin: { username: string; role: string }; csrfToken: string }>('/admin/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
    csrfToken = data.csrfToken;
    return data.admin;
  },
  logout: () => request('/admin/auth/logout', { method: 'POST' }),
  documents: () => request<{ items: CmsDocumentSummary[] }>('/admin/cms/documents'),
  document: (key: string) => request<CmsDocument>(`/admin/cms/documents/${key}`),
  saveDraft: (key: string, content: Record<string, unknown>) => request<{ saved: boolean; savedAt: string }>(`/admin/cms/documents/${key}/draft`, { method: 'PUT', body: JSON.stringify({ content }) }),
  publish: (key: string) => request<{ published: boolean; publishedAt: string }>(`/admin/cms/documents/${key}/publish`, { method: 'POST' }),
  restore: (key: string, revisionId: number) => request<{ restored: boolean; draft: Record<string, unknown> }>(`/admin/cms/documents/${key}/revisions/${revisionId}/restore`, { method: 'POST' }),
  media: (query = '') => request<{ items: MediaItem[] }>(`/admin/media${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  upload: (file: File, altText = '', section = 'general') => { const data = new FormData(); data.append('file', file); data.append('altText', altText); data.append('section', section); return request<{ id: number; url: string }>('/admin/media', { method: 'POST', body: data }); },
  updateMedia: (id: number, altText: string) => request(`/admin/media/${id}`, { method: 'PATCH', body: JSON.stringify({ altText }) }),
  deleteMedia: (id: number) => request(`/admin/media/${id}`, { method: 'DELETE' }),
  enquiries: () => request<{ items: Enquiry[] }>('/admin/enquiries?perPage=100'),
  updateEnquiry: (id: number, status: string) => request(`/admin/enquiries/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  publicBootstrap: () => request<PublicBootstrap>('/public/bootstrap'),
};

export interface MediaItem { id: number; url: string; name: string; type: string; size: number; altText: string; createdAt: string }
export interface Enquiry { id: number; name: string; email: string; phone?: string; service: string; message: string; status: string; createdAt: string }
