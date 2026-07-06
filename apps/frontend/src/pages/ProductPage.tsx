import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { products, categories, packagingLabel, contentLabel, minimumOrderLabel, orderUnitLabel } from '../data/products'
import { NotFoundPage } from './NotFoundPage'

const relatedProductsArticleNumber = [
  "80135",
  "80110",
  "10241",
  "10355"
]

// const relatedProducts = [
//   { name: 'Bierviltjes 1000st', meta: 'Non-food' },
//   { name: 'Bierglas 25cl, doos 12', meta: 'Non-food' },
//   { name: 'Weizen 24x50cl', meta: 'Krat' },
//   { name: 'Radler 24x33cl', meta: 'Blik' },
// ]

export function ProductPage() {
  const { category: categorySlug, product: productSlug } = useParams()
  const product = products.find(
    p => p.name.split(' ').join('-').toLowerCase() === productSlug
  )
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <NotFoundPage />
  }

  const category = categories.find(c => c.slug === categorySlug?.toLowerCase())
  const unitLabel = orderUnitLabel(product.packaging[0])

  function decrement() {
    setQuantity(q => Math.max(1, q - 1))
  }

  function increment() {
    setQuantity(q => q + 1)
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.floor(Number(e.target.value))
    setQuantity(Number.isFinite(value) ? Math.max(1, value) : 1)
  }

  const specs = [
    { label: 'Inhoud', value: contentLabel(product.packaging[0]) },
    { label: 'Verpakking', value: packagingLabel(product.packaging[0]) },
    ...(product.alcoholPercentage ? [{ label: 'Alcoholpercentage', value: product.alcoholPercentage }] : []),
    { label: 'Houdbaarheid', value: product.shelfLife },
    { label: 'Minimale afname', value: minimumOrderLabel(product.packaging[0]) },
  ]

  const relatedProducts = products.filter(p => relatedProductsArticleNumber.includes(p.articleNumber))

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showCategoryNav />
      <Breadcrumb
        breadcrumbs={[
          { url: '/', title: 'Home' },
          { url: '/catalog', title: 'Assortiment' },
          { url: `/catalog/${category?.slug ?? categorySlug}`, title: category?.label ?? categorySlug ?? '' },
          { url: `/catalog/${categorySlug}/${productSlug}`, title: product.name },
        ]}
      />

      <main className="flex-1">
        {/* Product detail */}
        <div className="flex flex-col gap-8 px-5 py-7 sm:px-10 sm:pb-12 lg:flex-row lg:gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-3.5 lg:w-[420px] lg:shrink-0">
            <div
              className="flex h-[260px] items-center justify-center rounded-md sm:h-[380px]"
              style={{ background: 'repeating-linear-gradient(45deg,#e4e8e2,#e4e8e2 14px,#d8ded4 14px,#d8ded4 28px)' }}
            >
              <span className="px-4 text-center font-mono text-[13px] text-[#5c665e]">productfoto — hoofdafbeelding</span>
            </div>
            <div className="flex gap-2.5 overflow-x-auto">
              {[true, false, false].map((active, i) => (
                <div
                  key={i}
                  className={`h-[78px] w-[78px] shrink-0 cursor-pointer rounded ${active ? 'border-2 border-[#123f30]' : 'border border-[#ececec]'}`}
                  style={{ background: 'repeating-linear-gradient(45deg,#e4e8e2,#e4e8e2 8px,#d8ded4 8px,#d8ded4 16px)' }}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col gap-4.5">
            <div>
              <span className="text-[13px] font-bold uppercase tracking-[.03em] text-[#68715e]">
                {product.category} · {product.subcategory}
              </span>
              <h1 className="mb-0 mt-1.5 text-2xl font-bold text-[#123f30] sm:text-[28px]">{product.name}</h1>
              <span className="text-[13px] text-[#8a938b]">Artikelnummer {product.articleNumber} · {product.brand}</span>
            </div>

            <div className="flex flex-col gap-3 rounded-md bg-[#f6f7f5] p-5.5">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl font-bold text-[#123f30] sm:text-[22px]">Log in voor uw prijs</span>
              </div>
              <p className="m-0 text-[13.5px] leading-relaxed text-[#5c665e]">
                Groothandelsprijzen zijn zichtbaar na inloggen met uw zakelijk account. Nog geen account? Vraag er vandaag een aan.
              </p>
              <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                <Link to="/login" className="flex min-h-11 items-center justify-center rounded bg-[#123f30] px-5.5 text-[14.5px] font-semibold text-white no-underline">Inloggen</Link>
                <Link to="/register" className="flex min-h-11 items-center justify-center rounded bg-[#c9a34a] px-5.5 text-[14.5px] font-bold text-[#123018] no-underline">Account aanvragen</Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <span className="text-[13.5px] font-semibold text-[#20291f]">Bestellen per:</span>
              <select
                value={unitLabel}
                onChange={() => {}}
                className="min-h-11 cursor-pointer rounded border border-[#d7dcd6] bg-white px-4 text-sm font-semibold text-[#3a423b] outline-none"
              >
                <option value={unitLabel}>{unitLabel}</option>
              </select>
              <div className="flex min-h-11 items-center gap-2 rounded border border-[#d7dcd6] px-2.5 text-sm text-[#3a423b]">
                <button
                  type="button"
                  onClick={decrement}
                  aria-label="Aantal verlagen"
                  className="flex h-7 w-7 items-center justify-center rounded font-semibold text-[#3a423b] hover:bg-[#f6f7f5]"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  aria-label="Aantal"
                  className="w-12 border-0 bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={increment}
                  aria-label="Aantal verhogen"
                  className="flex h-7 w-7 items-center justify-center rounded font-semibold text-[#3a423b] hover:bg-[#f6f7f5]"
                >
                  +
                </button>
              </div>
              <span className="flex min-h-11 w-full items-center justify-center rounded bg-[#eef2ee] px-5.5 text-[14.5px] font-semibold text-[#8a938b] sm:w-auto">Toevoegen - log in</span>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-[#ececec] pt-4.5">
              <h4 className="m-0 text-sm font-bold text-[#123f30]">Specificaties</h4>
              <div className="grid grid-cols-[160px_1fr] gap-y-2 text-[13.5px] text-[#3a423b]">
                {specs.map(s => (
                  <Fragment key={s.label}>
                    <span className="text-[#8a938b]">{s.label}</span>
                    <span>{s.value}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vaak samen besteld */}
        <div className="px-5 pb-12 pt-2 sm:px-10">
          <h3 className="m-0 mb-5 text-[19px] font-bold text-[#20291f]">Vaak samen besteld</h3>
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.name} product={p} imageHeight={110} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}