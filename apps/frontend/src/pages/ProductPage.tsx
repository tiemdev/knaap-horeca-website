import { useParams } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { ProductCard } from '../components/ProductCard'
import { products, categories } from '../data/products'
import { NotFoundPage } from './NotFoundPage'
import { ProductDetail } from '../components/ProductDetail'

const relatedProductsArticleNumber = ['80135', '80110', '10241', '10355']

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
    <PageLayout
      headerProps={{ showCategoryNav: true }}
      breadcrumbs={[
        { url: '/', title: 'Home' },
        { url: '/catalog', title: 'Assortiment' },
        { url: `/catalog/${category?.slug ?? categorySlug}`, title: category?.label ?? categorySlug ?? '' },
        { url: `/catalog/${categorySlug}/${productSlug}`, title: product.name },
      ]}
    >
      <ProductDetail product={product} />

      {/* Vaak samen besteld */}
      <div className="px-5 pb-12 pt-2 sm:px-10">
        <h3 className="m-0 mb-5 text-[19px] font-bold text-[#20291f]">Vaak samen besteld</h3>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} imageHeight={110} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
