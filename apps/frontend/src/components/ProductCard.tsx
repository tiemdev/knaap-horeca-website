import { Link } from "react-router-dom"
import type { Product } from "../data/products"
import { PlaceholderImage } from "./PlaceholderImage"

interface ProductCardProps {
  product: Product
  imageHeight?: number
}

export function ProductCard({ product, imageHeight = 130 }: ProductCardProps) {
  return (
    <Link to={`/catalog/${product.category.split(' ').join('-').toLowerCase()}/${product.name.split(' ').join('-').toLowerCase()}`} className="no-underline">
      <div className="overflow-hidden rounded-md border border-[#ececec]">
        <PlaceholderImage height={imageHeight} />
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
