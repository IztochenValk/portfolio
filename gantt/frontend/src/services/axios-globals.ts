import axios from "axios";

/** Single source of truth for token storage key */
export const AUTH_KEY = "authToken";
/** Base URL (fallback to /api) */

axios.defaults.baseURL = import.meta.env.VITE_API_URL + ":" + import.meta.env.VITE_API_PORT;

/** Bootstrap default header on hard refresh */
const boot = localStorage.getItem(AUTH_KEY);
if (boot) {
  (axios.defaults.headers as any).common = (axios.defaults.headers as any).common || {};
  axios.defaults.headers.common.Authorization = `Bearer ${boot}`;
}

/** Inject token before every request */
axios.interceptors.request.use((cfg) => {
  const t = localStorage.getItem(AUTH_KEY);
  if (t) {
    cfg.headers = cfg.headers ?? {};
    (cfg.headers as any).Authorization = `Bearer ${t}`;
  }
  return cfg;
});

/** Auto-clean token on 401 */
axios.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      try { localStorage.removeItem(AUTH_KEY); } catch {}
      // Optionnel: rediriger vers /login si besoin.
      // window.location.assign("/login");
    }
    return Promise.reject(err);
  }
);

/** Helper pour login/logout */
export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem(AUTH_KEY, token);
    (axios.defaults.headers as any).common = (axios.defaults.headers as any).common || {};
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem(AUTH_KEY);
    if ((axios.defaults.headers as any).common) {
      delete (axios.defaults.headers as any).common.Authorization;
    }
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_KEY);
}
