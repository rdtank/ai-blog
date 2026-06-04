// Base URL for the backend API.
//
// - Development: VITE_API_URL is unset, so requests stay relative ("/api/...")
//   and the Vite dev proxy forwards them to the backend (see vite.config.ts).
// - Production: set VITE_API_URL to the deployed backend origin, e.g.
//   https://ai-blog-backend.up.railway.app (no trailing slash). The browser
//   then calls Railway directly, which keeps the AI response streaming intact.
//
// Note: VITE_* vars are inlined at build time, so changing VITE_API_URL
// requires a frontend rebuild/redeploy.
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
