import { Link, useNavigate } from 'react-router-dom'
import { categories } from '../data/products'
import { getImageUrl } from './ImageUtils'
import { useAuthRedirectState } from '../hooks/useAuthRedirect'
import { useAuth } from '../hooks/useAuth'

export function Footer() {
  const authRedirectState = useAuthRedirectState()
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="flex flex-col gap-8 bg-[#123f30] px-5 py-9 text-[#cfe0d3] sm:px-10 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex max-w-[280px] flex-col gap-2">
        <img src={getImageUrl("knaap-logo.png")} alt="Knaap Horeca" className="h-8 w-auto opacity-90" style={{ filter: 'brightness(0) invert(1)' }} />
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#a9c2ae]">
          Groothandel in dranken, food en non-food sinds 1881.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 text-[13px] sm:grid-cols-2 lg:flex lg:gap-15">
        <div className="flex flex-col gap-2 lg:pr-3">
          <b className="text-white">Assortiment</b>
          <div className="grid grid-cols-2 gap-x-2 lg:gap-x-5 gap-y-2">
            {categories.map(cat => (
              <Link key={cat.slug} to={`/catalog/${cat.slug}`} className="text-[#cfe0d3] no-underline">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:pr-3">
          <b className="text-white">Klantenservice</b>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-[#cfe0d3] no-underline">Profiel</Link>
              <button type="button" onClick={handleLogout} className="cursor-pointer text-left text-[#cfe0d3]">Uitloggen</button>
            </>
          ) : (
            <>
              <Link to="/login" state={authRedirectState} className="text-[#cfe0d3] no-underline">Inloggen</Link>
              <Link to="/register" state={authRedirectState} className="text-[#cfe0d3] no-underline">Account aanvragen</Link>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:pr-3">
          <b className="text-white">Bedrijf</b>
          <Link to="/over-ons" className="text-[#cfe0d3] no-underline">Over ons</Link>
          <Link to="/bezorging" className="text-[#cfe0d3] no-underline">Bezorging</Link>
          <Link to="/contact" className="text-[#cfe0d3] no-underline">Contact</Link>
        </div>
      </div>
    </div>
  )
}
