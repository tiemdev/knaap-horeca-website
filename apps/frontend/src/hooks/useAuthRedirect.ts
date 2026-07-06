import { useLocation } from 'react-router-dom'

// Router `state` shape carried by links into /login and /register, and by the
// cross-links between those two pages, so the user lands back where they were
// - including whatever local component state that page wants restored.
export type AuthRedirectState<T = unknown> = {
  redirect?: string
  pageState?: T
} | null

// Builds the `state` to pass to a <Link to="/login"> or <Link to="/register">
// so that, after logging in or registering, the user is sent back to the page
// they came from (including any query string, e.g. active category filters).
// Pass `pageState` to also restore local component state (e.g. a selected
// quantity) once the user is routed back — it's handed back as that page's
// own `location.state` when the redirect completes.
export function useAuthRedirectState<T = unknown>(pageState?: T): AuthRedirectState<T> {
  const location = useLocation()
  return { redirect: `${location.pathname}${location.search}`, pageState }
}
