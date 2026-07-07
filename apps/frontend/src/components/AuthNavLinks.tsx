import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAuthRedirectState } from '../hooks/useAuthRedirect'

const variantClasses = {
  header: {
    link: 'flex min-h-11 items-center text-sm font-semibold text-[#123f30] no-underline',
    primary: 'flex min-h-11 items-center rounded bg-[#123f30] px-3.5 text-sm font-semibold text-white no-underline sm:px-4.5 cursor-pointer',
  },
  footer: {
    link: 'text-[#cfe0d3] no-underline',
    primary: 'cursor-pointer text-left text-[#cfe0d3]',
  },
} as const

// The "Inloggen / Account aanvragen" vs "Profiel / Uitloggen" nav pair,
// shared between Header and Footer so the two never drift out of sync.
export function AuthNavLinks({ variant }: { variant: keyof typeof variantClasses }) {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const authRedirectState = useAuthRedirectState()
  const classes = variantClasses[variant]

  function handleLogout() {
    logout()
    navigate('/')
  }

  if (isLoggedIn) {
    return (
      <>
        <Link to="/profile" className={classes.link}>Profiel</Link>
        <button type="button" onClick={handleLogout} className={classes.primary}>Uitloggen</button>
      </>
    )
  }

  return (
    <>
      <Link to="/login" state={authRedirectState} className={classes.link}>Inloggen</Link>
      <Link to="/register" state={authRedirectState} className={classes.primary}>Account aanvragen</Link>
    </>
  )
}
