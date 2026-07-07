import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { useAuth } from '../hooks/useAuth'
import { orders, type OrderLine } from '../data/orders'
import { products, packagingLabel } from '../data/products'

const views = [
  { slug: 'account', label: 'Account' },
  { slug: 'orders', label: 'Bestellingen' },
] as const

type ViewSlug = (typeof views)[number]['slug']

export function ProfilePage() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const { view } = useParams<{ view?: string }>()
  const activeView: ViewSlug = views.some(v => v.slug === view) ? (view as ViewSlug) : 'account'
  const activeLabel = views.find(v => v.slug === activeView)!.label

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <PageLayout
      headerProps={{ showSearch: false }}
      breadcrumbs={
        isLoggedIn
          ? [{ url: '/', title: 'Home' }, { url: '/profile', title: 'Profiel' }, { url: `/profile/${activeView}`, title: activeLabel }]
          : [{ url: '/', title: 'Home' }, { url: '/profile', title: 'Profiel' }]
      }
    >
      <div className="px-5 py-10 sm:px-10 sm:py-14">
        <div className="mx-auto flex max-w-[900px] flex-col gap-6">
          <div>
            <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Profiel</h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#68715e]">
              {isLoggedIn ? 'U bent ingelogd met uw zakelijk account.' : 'U bent niet ingelogd.'}
            </p>
          </div>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="flex min-h-11 w-fit items-center justify-center rounded bg-[#123f30] px-5.5 text-sm font-semibold text-white no-underline"
            >
              Inloggen
            </Link>
          ) : (
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              <nav className="flex gap-1.5 overflow-x-auto lg:w-[200px] lg:shrink-0 lg:flex-col lg:overflow-visible">
                {views.map(v => (
                  <Link
                    key={v.slug}
                    to={`/profile/${v.slug}`}
                    className={`shrink-0 rounded px-3.5 py-2.5 text-sm font-semibold no-underline ${
                      v.slug === activeView ? 'bg-[#123f30] text-white' : 'text-[#3a423b] hover:bg-[#f6f7f5]'
                    }`}
                  >
                    {v.label}
                  </Link>
                ))}
              </nav>

              <div className="min-w-0 flex-1">
                {activeView === 'account' ? <AccountView onLogout={handleLogout} /> : <OrdersView />}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

function AccountView({ onLogout }: { onLogout: () => void }) {
  return (
    <button
      type="button"
      onClick={onLogout}
      className="flex min-h-11 w-fit items-center justify-center rounded bg-[#123f30] px-5.5 text-sm font-semibold text-white cursor-pointer"
    >
      Uitloggen
    </button>
  )
}

function OrdersView() {
  if (orders.length === 0) {
    return <p className="text-[13.5px] text-[#68715e]">U heeft nog geen bestellingen geplaatst.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {orders.map(order => {
        const lines = order.lines
          .map(line => ({ line, product: products.find(p => p.id === line.productId) }))
          .filter((entry): entry is { line: OrderLine; product: (typeof products)[number] } => entry.product !== undefined)
        const total = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0)

        return (
          <div key={order.id} className="rounded-md border border-[#ececec] p-4.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-sm font-bold text-[#123f30]">Bestelling {order.id}</span>
                <span className="ml-2.5 text-[12.5px] text-[#8a938b]">{order.date}</span>
              </div>
              <span className="rounded-full bg-[#f6f7f5] px-3 py-1 text-[12px] font-semibold text-[#20291f]">{order.status}</span>
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              {lines.map(({ line, product }) => (
                <div key={line.productId} className="flex justify-between gap-3 text-[13.5px] text-[#3a423b]">
                  <span>{line.quantity}x {product.name}</span>
                  <span className="shrink-0 text-[#8a938b]">{packagingLabel(product.packaging[0])}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-[#ececec] pt-3 text-right text-sm font-bold text-[#123f30]">
              € {total.toFixed(2)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
