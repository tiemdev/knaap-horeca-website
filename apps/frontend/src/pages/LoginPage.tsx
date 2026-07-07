import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { FormField, fieldInputClass } from '../components/FormField'
import type { AuthRedirectState } from '../hooks/useAuthRedirect'
import { useAuth } from '../hooks/useAuth'
import { useState, type SubmitEvent } from 'react'

type LoginFormState = {
  email: string
  password: string
}

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const authState = location.state as AuthRedirectState
  const redirect = authState?.redirect ?? null

  const [loginFormState, setLoginFormState] = useState<LoginFormState>({
    email: 'test@test.nl',
    password: 'test1234'
  })

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    // No backend to authenticate against yet — treat any submit as a successful login.
    e.preventDefault()
    login()
    navigate(redirect ?? '/', { state: authState?.pageState })
  }

  return (
    <PageLayout
      headerProps={{ showSearch: false }}
      breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/login', title: 'Inloggen' }]}
    >
        <div className="flex justify-center px-5 py-10 sm:px-10 sm:py-14">
          <div className="w-full max-w-[420px] rounded-md border border-[#ececec] p-6 sm:p-8">
            <h1 className="m-0 text-2xl font-bold text-[#123f30]">Inloggen</h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#68715e]">
              Log in met uw zakelijk account om groothandelsprijzen te bekijken en te bestellen.
            </p>

            <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
              <FormField label="E-mailadres" required>
                <input 
                  type="email" 
                  required 
                  autoComplete="email" 
                  className={fieldInputClass} 
                  value={loginFormState.email}
                  onChange={(e) => setLoginFormState({...loginFormState, email: e.target.value})}
                />
              </FormField>
              <FormField label="Wachtwoord" required>
                <input 
                  type="password" 
                  required 
                  autoComplete="current-password" 
                  className={fieldInputClass} 
                  value={loginFormState.password}
                  onChange={(e) => setLoginFormState({...loginFormState, password: e.target.value})}
                />
              </FormField>

              <button
                type="submit"
                className="flex min-h-11 items-center justify-center rounded bg-[#123f30] text-sm font-semibold text-white cursor-pointer hover:bg-[#0f2e23] focus:outline-none focus:ring-2 focus:ring-[#123f30] focus:ring-offset-2"
              >
                Inloggen
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-2 border-t border-[#ececec] pt-5 text-[13.5px] text-[#5c665e]">
              <Link to="/forgot-password" className="font-semibold text-[#123f30] no-underline">Wachtwoord vergeten?</Link>
              <span>
                Nog geen account?{' '}
                <Link to="/register" state={authState} className="font-bold text-[#c9a34a] no-underline">Account aanvragen →</Link>
              </span>
            </div>
          </div>
        </div>
    </PageLayout>
  )
}
