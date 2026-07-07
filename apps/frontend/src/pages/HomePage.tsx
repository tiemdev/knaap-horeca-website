import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { ProductCard } from '../components/ProductCard'
import { products, categories } from '../data/products'
import { useAuthRedirectState } from '../hooks/useAuthRedirect'
import { Hero } from '../components/blocks/Hero'

const popularProductsArticleNumber = ['10234', '20101', '30110', '50110']

export function HomePage() {
  const popularProducts = products.filter(p => popularProductsArticleNumber.includes(p.articleNumber))
  const authRedirectState = useAuthRedirectState()

  return (
    <PageLayout headerProps={{ showSearch: true }}>
      {/* Hero */}
      <Hero authRedirectState={authRedirectState} />

      {/* Assortiment */}
      <div className="bg-white px-5 py-9 sm:px-10">
        <h3 className="m-0 mb-5.5 text-xl font-bold text-[#20291f]">Ons assortiment</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(cat => (
            <Link key={cat.slug} to={`/catalog/${cat.slug}`} className="no-underline">
              <div className="flex cursor-pointer flex-col items-center gap-2.5 rounded-md bg-[#f6f7f5] px-2.5 py-5.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#123f30] text-lg font-bold text-[#c9a34a]">
                  {cat.label.charAt(0)}
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
    </PageLayout>
  )
}
