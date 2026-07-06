import { Link, useNavigate } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'
import { useAuth } from '../hooks/useAuth'

export function ProfilePage() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showSearch={false} />
      <Breadcrumb breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/profile', title: 'Profiel' }]} />

      <main className="flex-1">
        <div className="px-5 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto flex max-w-[640px] flex-col gap-6">
            <div>
              <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Profiel</h1>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#68715e]">
                {isLoggedIn ? (
                  <span>U bent ingelogd met uw zakelijk account.</span>
                ) : (
                  <span>U bent niet ingelogd.</span>
                )}
              </p>
            </div>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-11 w-fit items-center justify-center rounded bg-[#123f30] px-5.5 text-sm font-semibold text-white"
              >
                Uitloggen
              </button>
            ) : (
              <Link to="/login" className="flex min-h-11 w-fit items-center justify-center rounded bg-[#123f30] px-5.5 text-sm font-semibold text-white">
                Inloggen
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
