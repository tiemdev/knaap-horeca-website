import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { categories, products } from '../data/products'

export function CatalogPage() {
  return (
    <PageLayout breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/catalog', title: 'Assortiment' }]}>
        <div className="px-5 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto max-w-[1120px]">
            <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Assortiment</h1>
            <p className="mt-2 max-w-[560px] text-[13.5px] leading-relaxed text-[#68715e]">
              Eén leverancier voor heel uw assortiment. Kies een categorie om het volledige aanbod te bekijken.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {categories.map(cat => {
                const count = products.filter(p => p.category === cat.label).length
                return (
                  <Link key={cat.slug} to={`/catalog/${cat.slug}`} className="no-underline">
                    <div className="flex flex-col items-center gap-2.5 rounded-md bg-[#f6f7f5] px-2.5 py-6 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#123f30] text-lg font-bold text-[#c9a34a]">
                        {cat.label.charAt(0)}
                      </div>
                      <span className="text-[13.5px] font-semibold text-[#20291f]">{cat.label}</span>
                      <span className="text-[12.5px] text-[#8a938b]">{count} producten</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
    </PageLayout>
  )
}
