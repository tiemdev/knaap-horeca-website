import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'
import { FormField, fieldInputClass } from '../components/FormField'
import type { AuthRedirectState } from '../hooks/useAuthRedirect'

export function RegisterPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const authState = location.state as AuthRedirectState
  const redirect = authState?.redirect ?? null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate(redirect ?? '/', { state: authState?.pageState })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showSearch={false} />
      <Breadcrumb breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/register', title: 'Account aanvragen' }]} />

      <main className="flex-1">
        <div className="flex justify-center px-5 py-10 sm:px-10 sm:py-14">
          <div className="w-full max-w-[640px] rounded-md border border-[#ececec] p-6 sm:p-8">
            <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Account aanvragen</h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#68715e]">
              Vraag een zakelijk account aan om groothandelsprijzen te bekijken en te bestellen. Wij nemen na ontvangst
              zo snel mogelijk contact met u op.
            </p>

            <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
              <FormField label="Bedrijfsnaam" required>
                <input type="text" required className={fieldInputClass} />
              </FormField>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Kamer van Koophandel nummer">
                  <input type="text" className={fieldInputClass} />
                </FormField>
                <FormField label="Naam contactpersoon">
                  <input type="text" className={fieldInputClass} />
                </FormField>
              </div>

              <FormField label="Straat en huisnummer" required>
                <input type="text" required className={fieldInputClass} />
              </FormField>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Postcode" required>
                  <input type="text" required className={fieldInputClass} />
                </FormField>
                <FormField label="Woonplaats" required>
                  <input type="text" required className={fieldInputClass} />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Telefoonnummer zaak" required>
                  <input type="tel" required className={fieldInputClass} />
                </FormField>
                <FormField label="Telefoonnummer mobiel" required>
                  <input type="tel" required className={fieldInputClass} />
                </FormField>
              </div>

              <FormField label="E-Mail adres" required>
                <input type="email" required className={fieldInputClass} />
              </FormField>

              <FormField label="Kies wachtwoord (minimaal 6 en maximaal 10 tekens)" required>
                <input type="password" required minLength={6} maxLength={10} className={fieldInputClass} />
              </FormField>

              <FormField label="Bericht" required>
                <textarea required rows={5} className={`${fieldInputClass} resize-y`} />
              </FormField>

              <button
                type="submit"
                className="flex min-h-11 items-center justify-center rounded bg-[#123f30] text-sm font-semibold text-white"
              >
                Account aanvragen
              </button>
            </form>

            <div className="mt-6 border-t border-[#ececec] pt-5 text-[13.5px] text-[#5c665e]">
              Heeft u al een account?{' '}
              <Link to="/login" state={authState} className="font-bold text-[#c9a34a] no-underline">Inloggen →</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
