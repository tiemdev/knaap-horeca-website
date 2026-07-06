import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { getImageUrl } from './ImageUtils';

const navLinks = [
  { label: 'Assortiment', href: '/catalog' },
  { label: 'Merken', href: '/merken' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Bezorging', href: '/bezorging' },
]

const categories = ['Bier', 'Frisdrank', 'Wijn', 'Gedistilleerd', 'Koffie', 'Thee', 'Food', 'Non-food']

export function Header({ showCategoryNav, showSearch = true }: { showCategoryNav?: boolean; showSearch?: boolean }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeCategory = categories.find(c =>
    location.pathname.toLowerCase().includes(c.toLowerCase())
  ) ?? 'Bier'

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e0e4de] bg-white px-5 py-4 sm:px-10 sm:py-5">
        <Link to="/" className="shrink-0">
          <img src={getImageUrl("knaap-logo.png")} alt="Knaap Horeca" className="h-9 w-auto lg:h-12" />
        </Link>

        {showSearch && (
          <div className="order-3 w-full lg:order-none lg:mx-10 lg:w-auto lg:max-w-[460px] lg:flex-1">
            <input
              placeholder="Zoek op product, merk of artikelnummer"
              className="w-full rounded border border-[#d7dcd6] px-3.5 py-2.5 font-sans text-sm text-[#3a423b] outline-none"
            />
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="flex min-h-11 items-center text-sm font-semibold text-[#123f30] no-underline">Inloggen</Link>
          <Link to="/register" className="flex min-h-11 items-center rounded bg-[#123f30] px-3.5 text-sm font-semibold text-white no-underline sm:px-4.5">Account aanvragen</Link>
          {!showCategoryNav && (
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen(o => !o)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-[#d7dcd6] text-lg lg:hidden"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </div>

      {!showCategoryNav && mobileOpen && (
        <div className="flex flex-col border-b border-[#e0e4de] bg-white px-5 py-2 lg:hidden">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center text-[14.5px] font-medium text-[#20291f] no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {showCategoryNav && (
        <div className="flex h-12 items-center gap-8 overflow-x-auto whitespace-nowrap border-b-2 border-[#123f30] bg-white px-5 text-sm font-semibold text-[#20291f] sm:px-10">
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/catalog/${cat.toLowerCase()}`}
              className={`shrink-0 py-3.5 no-underline ${cat === activeCategory ? '-mb-0.5 border-b-2 border-[#c9a34a] text-[#123f30]' : 'text-[#20291f]'}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {!showCategoryNav && (
        <div className="hidden h-12 items-center gap-8 border-b border-[#e0e4de] bg-white px-10 text-[14.5px] font-medium text-[#20291f] lg:flex">
          {navLinks.map(link => (
            <Link key={link.label} to={link.href} className="text-[#20291f] no-underline">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
