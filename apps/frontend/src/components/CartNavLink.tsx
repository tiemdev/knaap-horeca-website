import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

const variantClasses = {
  header: 'flex min-h-11 items-center text-sm font-semibold text-[#123f30] no-underline',
  footer: 'text-[#cfe0d3] no-underline',
} as const

// Cart only works for logged-in accounts (same gate as prices), so the link
// itself only shows up once logged in — nothing to gate on the /cart page.
export function CartNavLink({ variant }: { variant: keyof typeof variantClasses }) {
  const { isLoggedIn } = useAuth()
  const { count } = useCart()

  if (!isLoggedIn) return null

  return (
    <Link to="/cart" className={variantClasses[variant]}>
      Winkelwagen{count > 0 ? ` (${count})` : ''}
    </Link>
  )
}
