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

export interface AdminAccount {
  id: number;
  username: string;
  role: 'owner' | 'admin';
  isActive: boolean;
  createdAt: string;
}

function findMediaUrl(value: unknown, depth = 0): string | undefined {
  if (!value || typeof value !== 'object' || depth > 4) return undefined;
  const record = value as Record<string, unknown>;
  for (const key of ['url', 'path', 'mediaUrl', 'media_url', 'fileUrl', 'file_url', 'location', 'src']) {
    const candidate = record[key];
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
  }
  for (const child of Object.values(record)) {
    const found = findMediaUrl(child, depth + 1);
    if (found) return found;
  }
  return undefined;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (!(init.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (csrfToken) headers.set('X-CSRF-Token', csrfToken);
  const response = await fetch(`/api/v1${path}`, { ...init, headers, credentials: 'include' });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fallback = response.status === 413
      ? 'The hosting server rejected this file as too large. Check upload_max_filesize and post_max_size in cPanel.'
      : 'The request could not be completed.';
    const error = new Error(body?.error?.message || fallback) as Error & { status?: number; details?: Record<string, string> };
    error.status = response.status;
    error.details = body?.error?.details;
    throw error;
  }
  // Some older hosting copies return the payload directly instead of wrapping
  // it in { data }; accept either shape so uploads and admin actions stay usable.
  return (body?.data ?? body) as T;
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
  media: async (query = '') => {
    const payload = await request<{ items?: Array<Record<string, unknown>> }>(`/admin/media${query ? `?q=${encodeURIComponent(query)}` : ''}`);
    const items = Array.isArray(payload?.items) ? payload.items.filter((item) => item && typeof item === 'object') : [];
    return {
      items: items.map((item) => ({
        id: Number(item.id),
        url: String(item.url ?? item.path ?? item.mediaUrl ?? ''),
        name: String(item.name ?? item.originalName ?? item.original_name ?? 'Uploaded media'),
        type: String(item.type ?? item.mimeType ?? item.mime_type ?? 'application/octet-stream'),
        size: Number(item.size ?? item.sizeBytes ?? item.size_bytes ?? 0),
        altText: String(item.altText ?? item.alt_text ?? ''),
        createdAt: String(item.createdAt ?? item.created_at ?? ''),
      })).filter((item) => item.url && Number.isFinite(item.id)),
    } satisfies { items: MediaItem[] };
  },
  upload: async (file: File, altText = '', section = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', altText);
    formData.append('section', section);
    const response = await request<Record<string, unknown>>('/admin/media', { method: 'POST', body: formData });
    // Older deployed API copies may return the standard { data: ... } envelope
    // directly, while request() normally unwraps it. Accept either shape here.
    const payload = response.data && typeof response.data === 'object'
      ? response.data as Record<string, unknown>
      : response;
    const nested = [payload.media, payload.item, payload.file, payload.result].find((item) => item && typeof item === 'object') as Record<string, unknown> | undefined;
    let url = findMediaUrl(response);
    const id = Number(payload.id ?? nested?.id ?? 0);
    // Some deployed copies commit the upload, then return an incomplete
    // response. Recover the URL from the existing media list by ID or filename.
    if (!url) {
      const library = await request<{ items?: Array<Record<string, unknown>> }>('/admin/media');
      const saved = library.items?.find((item) =>
        (id > 0 && Number(item.id) === id)
        || [item.name, item.originalName, item.original_name].some((name) =>
          typeof name === 'string' && name.toLowerCase() === file.name.toLowerCase()),
      );
      url = findMediaUrl(saved);
    }
    if (!url) throw new Error('The upload was saved, but its media URL could not be recovered. Open Media Library and select it there.');
    return { id, url };
  },
  updateMedia: (id: number, altText: string) => request(`/admin/media/${id}`, { method: 'PATCH', body: JSON.stringify({ altText }) }),
  deleteMedia: (id: number) => request(`/admin/media/${id}`, { method: 'DELETE' }),
  enquiries: () => request<{ items: Enquiry[] }>('/admin/enquiries?perPage=100'),
  updateEnquiry: (id: number, status: string) => request(`/admin/enquiries/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  admins: () => request<{ items: AdminAccount[] }>('/admin/admins'),
  createAdmin: (account: { username: string; password: string; role: 'owner' | 'admin' }) => request<{ id: number }>('/admin/admins', { method: 'POST', body: JSON.stringify(account) }),
  updateAdmin: (id: number, account: { username: string; role: 'owner' | 'admin'; isActive: boolean; password?: string }) => request<{ updated: boolean }>(`/admin/admins/${id}`, { method: 'PATCH', body: JSON.stringify(account) }),
  publicBootstrap: () => request<PublicBootstrap>('/public/bootstrap'),
};

export interface MediaItem { id: number; url: string; name: string; type: string; size: number; altText: string; createdAt: string }
export interface Enquiry { id: number; name: string; email: string; phone?: string; service: string; message: string; status: string; createdAt: string }
