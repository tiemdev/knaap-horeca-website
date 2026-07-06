import type { Brand } from '../pages/BrandsPage'

export function BrandCard({ brand }: { brand: Brand }) {
  return (
      <div key={brand.name} className="flex flex-col gap-2.5 rounded-md border border-[#ececec] p-5">
          <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#123f30] text-base font-bold text-[#c9a34a]">
                  {brand.name.split(' ').map(w => w.charAt(0)).join('')}
              </div>
              <div className="flex flex-col">
                  <span className="text-[14.5px] font-semibold text-[#20291f]">{brand.name}</span>
                  <span className="text-[12.5px] text-[#8a938b]">{brand.count} producten</span>
              </div>
          </div>
          <span className="text-[12.5px] text-[#68715e]">Beschikbaar in: {brand.categories.join(', ')}</span>
      </div>
  )
}