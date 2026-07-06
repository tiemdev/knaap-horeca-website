import { Link } from "react-router"
import type { Product } from "../data/products"

interface ProductCardProps {
  product: Product
  imageHeight?: number
}

export function ProductCard({ product, imageHeight = 130 }: ProductCardProps) {
  return (
    <Link to={`/catalog/${product.category.split(' ').join('-').toLowerCase()}/${product.name.split(' ').join('-').toLowerCase()}`} style={{ textDecoration: 'none' }}>
      <div className="overflow-hidden rounded-md border border-[#ececec]">
        <div
          className="flex items-center justify-center"
          style={{ height: imageHeight, background: 'repeating-linear-gradient(45deg,#e4e8e2,#e4e8e2 10px,#d8ded4 10px,#d8ded4 20px)' }}
        >
          <span className="font-mono text-[11px] text-[#5c665e]">productfoto</span>
        </div>
        <div className="flex flex-col gap-1.5 p-3.5">
          <span className="text-sm font-semibold text-[#20291f]">{product.name}</span>
          <span className="text-[12.5px] text-[#68715e]">{product.brand}</span>
          <span className="text-[12.5px] text-[#68715e]">{`${product.category} ⋅ ${product.subcategory}`}</span>
          <span className="text-[13px] font-bold text-[#123f30]">Log in voor prijzen →</span>
        </div>
      </div>
    </Link>
  )
}
