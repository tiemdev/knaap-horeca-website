import { PageLayout } from '../components/PageLayout'
import { products } from '../data/products'
import { BrandCard } from '../components/BrandCard'

export interface Brand {
  name: string
  count: number
  categories: string[]
}

function getBrands(): Brand[] {
  const byName = new Map<string, { count: number; categories: Set<string> }>()

  for (const p of products) {
    const entry = byName.get(p.brand) ?? { count: 0, categories: new Set<string>() }
    entry.count += 1
    entry.categories.add(p.category)
    byName.set(p.brand, entry)
  }

  return [...byName.entries()]
    .map(([name, { count, categories }]) => ({ name, count, categories: [...categories].sort() }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function BrandsPage() {
  const brands = getBrands()

  return (
    <PageLayout breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/merken', title: 'Merken' }]}>
      <div className="px-5 py-10 sm:px-10 sm:py-14">
        <div className="mx-auto max-w-[1120px]">
          <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Merken</h1>
          <p className="mt-2 max-w-[560px] text-[13.5px] leading-relaxed text-[#68715e]">
            Een greep uit de merken die wij voeren, verspreid over ons hele assortiment.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map(brand => (
              <BrandCard key={brand.name} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
