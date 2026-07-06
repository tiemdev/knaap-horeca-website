import { Link } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showSearch={false} />
      <Breadcrumb breadcrumbs={[{ url: '/', title: 'Home' }, { url: '#', title: 'Pagina niet gevonden' }]} />

      <main className="flex-1">
        <div className="flex flex-col items-center px-5 py-16 text-center sm:px-10 sm:py-24">
          <span className="text-[13px] font-bold uppercase tracking-[.08em] text-[#c9a34a]">Foutcode 404</span>
          <h1 className="m-0 mt-3 text-[42px] font-bold text-[#123f30] sm:text-[56px]">Pagina niet gevonden</h1>
          <p className="mt-4 max-w-[460px] text-[14.5px] leading-relaxed text-[#68715e]">
            De pagina die u zoekt bestaat niet (meer) of is verplaatst. Controleer de link, of ga terug naar de
            homepage om verder te bladeren in ons assortiment.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="flex min-h-11 items-center justify-center rounded bg-[#123f30] px-6.5 text-sm font-semibold text-white no-underline"
            >
              Naar de homepage
            </Link>
            <Link
              to="/catalog/bier"
              className="flex min-h-11 items-center justify-center rounded border-2 border-[#123f30] px-6.5 text-sm font-semibold text-[#123f30] no-underline"
            >
              Bekijk assortiment
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
