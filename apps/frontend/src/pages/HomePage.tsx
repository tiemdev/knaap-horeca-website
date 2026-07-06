import { Link } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { useAuthRedirectState } from '../hooks/useAuthRedirect'

const categories = [
  { label: 'Bier', initial: 'B', href: '/catalog/bier' },
  { label: 'Frisdrank', initial: 'F', href: '/catalog/frisdrank' },
  { label: 'Wijn', initial: 'W', href: '/catalog/wijn' },
  { label: 'Gedistilleerd', initial: 'G', href: '/catalog/gedistilleerd' },
  { label: 'Koffie', initial: 'K', href: '/catalog/koffie' },
  { label: 'Thee', initial: 'T', href: '/catalog/thee' },
  { label: 'Food', initial: 'F', href: '/catalog/food' },
  { label: 'Non-food', initial: 'N', href: '/catalog/non-food' },
]

// const usps = ['140 jaar ervaring', 'Levering door heel NL', 'Groothandelsprijzen op aanvraag', 'Vaste accountmanager']

const popularProductsArticleNumber = [
  '10234',
  '20101',
  '30110',
  '50110'
  // { name: 'Pilsner 24×30cl', meta: 'Krat · statiegeld excl.', category: 'bier' },
  // { name: 'Cola 24×33cl blik', meta: 'Tray', category: 'frisdrank' },
  // { name: 'Huiswijn Rood 6×75cl', meta: 'Doos', category: 'wijn' },
  // { name: 'Filterkoffie 1kg', meta: 'Zak', category: 'koffie' },
]

export function HomePage() {
  const popularProducts = products.filter(p => popularProductsArticleNumber.includes(p.articleNumber))
  const authRedirectState = useAuthRedirectState()

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showSearch={true} />

      <main className="flex-1">
      {/* Hero */}
      <div className="flex flex-col items-center bg-[#123f30] lg:flex-row">
        <div className="flex flex-col gap-4.5 px-5 py-10 sm:px-12 sm:py-16 lg:flex-1">
          <span className="text-[12.5px] font-bold uppercase tracking-[.08em] text-[#c9a34a]">
            Sinds 1881 · 140 jaar
          </span>
          <h1 className="m-0 max-w-[480px] text-[26px] font-bold leading-[1.18] text-white sm:text-[32px] lg:text-[42px]">
            Uw horecagroothandel voor dranken, food &amp; non-food
          </h1>
          <p className="m-0 max-w-[460px] text-base leading-relaxed text-[#cfe0d3]">
            Eén leverancier voor heel uw assortiment — scherpe groothandelsprijzen, vaste kwaliteit en levering door heel Nederland.
          </p>
          <div className="mt-2 flex flex-col gap-3.5 sm:flex-row">
            <Link
              to="/catalog"
              className="flex min-h-11 items-center justify-center rounded bg-[#c9a34a] px-6.5 text-[15px] font-bold text-[#123018] no-underline"
            >
              Bekijk assortiment
            </Link>
            <Link to="/register" state={authRedirectState} className="flex min-h-11 items-center justify-center rounded border-2 border-white px-6.5 text-[15px] font-semibold text-white no-underline">
              Vraag een account aan
            </Link>
          </div>
        </div>
        <div
          className="flex min-h-[220px] w-full items-center justify-center self-stretch lg:min-h-[380px] lg:flex-1"
          style={{ background: 'repeating-linear-gradient(45deg,#1c5340,#1c5340 14px,#164635 14px,#164635 28px)' }}
        >
          <span className="rounded-sm bg-[#123f30cc] px-3 py-1.5 font-mono text-[13px] text-[#cfe0d3]">
            sfeerfoto - magazijn
          </span>
        </div>
      </div>

      {/* Assortiment */}
      <div className="bg-white px-5 py-9 sm:px-10">
        <h3 className="m-0 mb-5.5 text-xl font-bold text-[#20291f]">Ons assortiment</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(cat => (
            <Link key={cat.label} to={cat.href} className="no-underline">
              <div className="flex cursor-pointer flex-col items-center gap-2.5 rounded-md bg-[#f6f7f5] px-2.5 py-5.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#123f30] text-lg font-bold text-[#c9a34a]">
                  {cat.initial}
                </div>
                <span className="text-[13.5px] font-semibold text-[#20291f]">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular products */}
      <div className="bg-white px-5 py-9 sm:px-10">
        <h3 className="m-0 mb-5.5 text-xl font-bold text-[#20291f]">Populair deze week</h3>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      </main>

      <Footer />
    </div>
  )
}
