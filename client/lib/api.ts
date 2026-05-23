const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  return res.json();
}

// Auth
export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) =>
    fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
};

// Colleges
export const collegesAPI = {
  list: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/colleges${query}`);
  },
  filters: () => fetchAPI('/colleges/filters'),
  detail: (id: string | number) => fetchAPI(`/colleges/${id}`),
  compare: (college_ids: number[]) =>
    fetchAPI('/colleges/compare', { method: 'POST', body: JSON.stringify({ college_ids }) }),
};

// Saved
export const savedAPI = {
  getColleges: () => fetchAPI('/saved/colleges'),
  toggleCollege: (collegeId: number) =>
    fetchAPI(`/saved/colleges/${collegeId}`, { method: 'POST' }),
  getComparisons: () => fetchAPI('/saved/comparisons'),
  saveComparison: (name: string, college_ids: number[]) =>
    fetchAPI('/saved/comparisons', { method: 'POST', body: JSON.stringify({ name, college_ids }) }),
  deleteComparison: (id: number) =>
    fetchAPI(`/saved/comparisons/${id}`, { method: 'DELETE' }),
};
