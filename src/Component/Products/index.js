import AllProductsSection from '../AllProductsSection'
import ProductPrimeDealsSection from "../ProductPrimeDealSection"

import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="product-sections">
      <ProductPrimeDealsSection />
      <AllProductsSection />
    </div>
  </>
)

export default Products
