import { Link, useParams, useSearchParams } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { products, packagingLabel, categories } from '../data/products'
import { Breadcrumb } from '../components/Breadcrumb'
import { applyFilters, Filter, filtersToParams, getActiveFiltersFromParams, type ActiveFilters } from '../components/Filter'
import { useState } from 'react'

function getProductsByCategory(category: string) {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

const DEFAULT_PER_PAGE = 12

export function CategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>()
  const category = categories.find(c => c.slug === categorySlug?.toLowerCase()) ?? categories[0]
  const categoryProducts = getProductsByCategory(category.label)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  // Derive everything from the URL - no useState needed.
  const filter = getActiveFiltersFromParams(categoryProducts, searchParams)
  const perPage = Number(searchParams.get('perPage')) || DEFAULT_PER_PAGE
  const currentPage = Number(searchParams.get('page')) || 1

  const visibleProducts = applyFilters(categoryProducts, filter)

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / perPage))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * perPage
  const pageProducts = visibleProducts.slice(start, start + perPage)

  // Helper to merge updates into the existing params.
  function updateParams(next: Record<string, string | null>) {
    const merged = new URLSearchParams(searchParams)
    for (const [key, val] of Object.entries(next)) {
      if (val === null || val === '') merged.delete(key)
      else merged.set(key, val)
    }
    setSearchParams(merged)
  }

  function handleFilterChange(newFilter: ActiveFilters) {
    const filterParams = filtersToParams(newFilter)
    // Clear all filter keys first, then set the active ones, and reset to page 1.
    updateParams({
      subcategory: filterParams.subcategory ?? null,
      brand: filterParams.brand ?? null,
      packaging: filterParams.packaging ?? null,
      page: null, // back to page 1 whenever filters change
    })
  }

  function handlePerPageChange(newPerPage: number) {
    updateParams({
      perPage: newPerPage === DEFAULT_PER_PAGE ? null : String(newPerPage),
      page: null, // reset to page 1 when page size changes
    })
  }

  function goToPage(n: number) {
    updateParams({ page: n === 1 ? null : String(n) })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showCategoryNav />
      <Breadcrumb breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/catalog', title: 'Assortiment' }, { url: `/catalog/${category.slug}`, title: category.label }]} />

      <main className="flex-1">

      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-3 px-5 pb-6 pt-4 sm:px-10">
        <div>
          <h1 className="m-0 text-[26px] font-bold text-[#123f30] sm:text-[30px]">{category.label}</h1>
          <span className="text-[13.5px] text-[#68715e]">
            {visibleProducts.length == categoryProducts.length ? visibleProducts.length : `${visibleProducts.length}/${categoryProducts.length}`} producten
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-[13.5px] text-[#3a423b]">
          <span>Sorteren op:</span>
          <span className="rounded border border-[#d7dcd6] px-3.5 py-2 font-semibold">Meest besteld ▾</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pb-12 sm:px-10 lg:flex-row lg:gap-8">
        {/* Mobile/tablet filters trigger */}
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex min-h-11 w-full items-center justify-center rounded border border-[#d7dcd6] px-4 text-sm font-semibold text-[#3a423b] sm:w-auto lg:hidden"
        >
          Filters
        </button>

        {/* Sidebar (desktop) */}
        <div className="hidden lg:block lg:w-[230px] lg:shrink-0">
          <Filter
            value={filter}
            onChange={handleFilterChange}
            perPage={perPage}
            onPerPageChange={handlePerPageChange}
          />
        </div>

        {/* Mobile/tablet filter drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 flex items-end lg:hidden">
            <button
              type="button"
              aria-label="Sluiten"
              onClick={() => setFiltersOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-xl bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-bold text-[#123f30]">Filters</span>
                <button
                  type="button"
                  aria-label="Sluiten"
                  onClick={() => setFiltersOpen(false)}
                  className="flex h-11 w-11 items-center justify-center text-xl"
                >
                  ✕
                </button>
              </div>
                <Filter
                  value={filter}
                  onChange={handleFilterChange}
                  perPage={perPage}
                  onPerPageChange={handlePerPageChange}
                />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignContent: 'start' }}>
          {pageProducts.map(p => (
            <Link key={p.name} to={`/catalog/${category.slug}/${p.name.split(' ').join('-').toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <div style={{ border: '1px solid #ececec', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  height: '140px',
                  background: 'repeating-linear-gradient(45deg,#e4e8e2,#e4e8e2 10px,#d8ded4 10px,#d8ded4 20px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#5c665e' }}>productfoto</span>
                </div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#20291f' }}>{p.name}</span>
                  <span style={{ fontSize: '12.5px', color: '#68715e' }}>{packagingLabel(p.packaging[0])} · art. {p.articleNumber}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#123f30' }}>Log in voor prijzen →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '0 40px 48px', fontSize: '13.5px', color: '#3a423b' }}>
        <span
          onClick={() => safePage > 1 && goToPage(safePage - 1)}
          style={{ padding: '0 10px', height: '32px', display: 'flex', alignItems: 'center', borderRadius: '4px', border: '1px solid #d7dcd6', cursor: safePage > 1 ? 'pointer' : 'not-allowed', opacity: safePage > 1 ? 1 : 0.4 }}
        >‹</span>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <span
            key={n}
            onClick={() => goToPage(n)}
            style={{
              width: '32px', height: '32px', borderRadius: '4px',
              background: n === safePage ? '#123f30' : undefined,
              color: n === safePage ? '#fff' : undefined,
              border: n === safePage ? undefined : '1px solid #d7dcd6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: n === safePage ? 700 : undefined, cursor: 'pointer'
            }}
          >{n}</span>
        ))}

        <span
          onClick={() => safePage < totalPages && goToPage(safePage + 1)}
          style={{ padding: '0 10px', height: '32px', display: 'flex', alignItems: 'center', borderRadius: '4px', border: '1px solid #d7dcd6', cursor: safePage < totalPages ? 'pointer' : 'not-allowed', opacity: safePage < totalPages ? 1 : 0.4 }}
        >›</span>
      </div>

      </main>

      <Footer />
    </div>
  )
}

