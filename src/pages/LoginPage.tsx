import { Link } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'
import { FormField, fieldInputClass } from '../components/FormField'

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showSearch={false} />
      <Breadcrumb breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/login', title: 'Inloggen' }]} />

      <main className="flex-1">
        <div className="flex justify-center px-5 py-10 sm:px-10 sm:py-14">
          <div className="w-full max-w-[420px] rounded-md border border-[#ececec] p-6 sm:p-8">
            <h1 className="m-0 text-2xl font-bold text-[#123f30]">Inloggen</h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#68715e]">
              Log in met uw zakelijk account om groothandelsprijzen te bekijken en te bestellen.
            </p>

            <form className="mt-6 flex flex-col gap-5">
              <FormField label="E-mailadres" required>
                <input type="email" required autoComplete="email" className={fieldInputClass} />
              </FormField>
              <FormField label="Wachtwoord" required>
                <input type="password" required autoComplete="current-password" className={fieldInputClass} />
              </FormField>

              <button
                type="submit"
                className="flex min-h-11 items-center justify-center rounded bg-[#123f30] text-sm font-semibold text-white"
              >
                Inloggen
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-2 border-t border-[#ececec] pt-5 text-[13.5px] text-[#5c665e]">
              <a href="#" className="font-semibold text-[#123f30] no-underline">Wachtwoord vergeten?</a>
              <span>
                Nog geen account?{' '}
                <Link to="/register" className="font-bold text-[#c9a34a] no-underline">Account aanvragen →</Link>
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
