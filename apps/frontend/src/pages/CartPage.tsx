import { Link } from 'react-router-dom'
import { useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { products, orderUnitLabel } from '../data/products'

export function CartPage() {
  const { isLoggedIn } = useAuth()
  const cart = useCart()
  const [placed, setPlaced] = useState(false)

  const lines = cart.lines
    .map(line => ({ line, product: products.find(p => p.id === line.productId) }))
    .filter((entry): entry is { line: (typeof cart.lines)[number]; product: (typeof products)[number] } => entry.product !== undefined)

  const total = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0)

  function handlePlaceOrder() {
    cart.clear()
    setPlaced(true)
  }

  return (
    <PageLayout
      headerProps={{ showSearch: false }}
      breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/cart', title: 'Winkelwagen' }]}
    >
      <div className="px-5 py-10 sm:px-10 sm:py-14">
        <div className="mx-auto flex max-w-[820px] flex-col gap-6">
          <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Winkelwagen</h1>

          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 rounded-md bg-[#f6f7f5] p-5.5">
              <p className="m-0 text-[13.5px] leading-relaxed text-[#5c665e]">
                Log in met uw zakelijk account om uw winkelwagen te bekijken en te bestellen.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/login" className="flex min-h-11 items-center justify-center rounded bg-[#123f30] px-5.5 text-[14.5px] font-semibold text-white no-underline">
                  Inloggen
                </Link>
                <Link to="/register" className="flex min-h-11 items-center justify-center rounded bg-[#c9a34a] px-5.5 text-[14.5px] font-bold text-[#123018] no-underline">
                  Account aanvragen
                </Link>
              </div>
            </div>
          ) : placed ? (
            <div className="flex flex-col gap-2 rounded-md bg-[#f6f7f5] p-5.5">
              <span className="text-lg font-bold text-[#123f30]">Bedankt voor uw bestelling</span>
              <p className="m-0 text-[13.5px] leading-relaxed text-[#5c665e]">
                We hebben uw bestelling ontvangen en nemen deze zo snel mogelijk in behandeling.
              </p>
              <Link
                to="/profile/orders"
                className="mt-1 flex min-h-11 w-fit items-center justify-center rounded bg-[#123f30] px-5.5 text-[14.5px] font-semibold text-white no-underline"
              >
                Bekijk mijn bestellingen
              </Link>
            </div>
          ) : lines.length === 0 ? (
            <p className="text-[13.5px] text-[#68715e]">Uw winkelwagen is leeg.</p>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {lines.map(({ line, product }) => {
                  const packaging = product.packaging[line.packagingIndex]
                  return (
                    <div key={`${line.productId}-${line.packagingIndex}`} className="flex items-center gap-4 rounded-md border border-[#ececec] p-3.5">
                      <PlaceholderImage caption="" className="h-16 w-16 shrink-0 rounded" />
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-[#20291f]">{product.name}</span>
                        <span className="text-[12.5px] text-[#68715e]">{orderUnitLabel(packaging)}</span>
                      </div>
                      <input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={e => {
                          const value = Math.floor(Number(e.target.value))
                          cart.updateQuantity(line.productId, line.packagingIndex, Number.isFinite(value) ? Math.max(1, value) : 1)
                        }}
                        aria-label="Aantal"
                        className="w-14 shrink-0 rounded border border-[#d7dcd6] px-2 py-2 text-center text-sm outline-none"
                      />
                      <span className="w-20 shrink-0 text-right text-sm font-bold text-[#123f30]">
                        € {(product.price * line.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => cart.removeItem(line.productId, line.packagingIndex)}
                        aria-label="Verwijderen"
                        className="shrink-0 cursor-pointer text-[#8a938b] hover:text-[#3a423b]"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between border-t border-[#ececec] pt-5">
                <span className="text-sm font-semibold text-[#20291f]">Totaal</span>
                <span className="text-xl font-bold text-[#123f30]">€ {total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="flex min-h-11 w-fit items-center justify-center rounded bg-[#123f30] px-6.5 text-sm font-semibold text-white cursor-pointer"
              >
                Bestelling plaatsen
              </button>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
