import { useParams, useSearchParams } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { ProductCard } from '../components/ProductCard'
import { products, categories } from '../data/products'
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
    <PageLayout
      headerProps={{ showCategoryNav: true }}
      breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/catalog', title: 'Assortiment' }, { url: `/catalog/${category.slug}`, title: category.label }]}
    >
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
        <div className="grid flex-1 grid-cols-1 content-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {pageProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 px-10 pb-12 text-[13.5px] text-[#3a423b]">
        <button
          type="button"
          onClick={() => safePage > 1 && goToPage(safePage - 1)}
          disabled={safePage <= 1}
          className="flex h-8 items-center rounded border border-[#d7dcd6] px-2.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <button
            type="button"
            key={n}
            onClick={() => goToPage(n)}
            className={`flex h-8 w-8 items-center justify-center rounded ${
              n === safePage ? 'bg-[#123f30] font-bold text-white' : 'border border-[#d7dcd6]'
            }`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          onClick={() => safePage < totalPages && goToPage(safePage + 1)}
          disabled={safePage >= totalPages}
          className="flex h-8 items-center rounded border border-[#d7dcd6] px-2.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </PageLayout>
  )
}
