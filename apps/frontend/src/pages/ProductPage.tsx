import { useParams } from 'react-router-dom'
import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { products, categories } from '../data/products'
import { NotFoundPage } from './NotFoundPage'
import { ProductComponent } from '../components/ProductComponent'

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
  const relatedProducts = products.filter(p => relatedProductsArticleNumber.includes(p.articleNumber))
  const category = categories.find(c => c.slug === categorySlug?.toLowerCase())

    if (!product) {
        return <NotFoundPage />
    }

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
        <ProductComponent product={product} />

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