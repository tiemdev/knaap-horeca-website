import { Routes, Route, HashRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'
import { ProductPage } from './pages/ProductPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AboutPage } from './pages/AboutPage'
import { DeliveryInformationPage } from './pages/DeliveryInformationPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CatalogPage } from './pages/CatalogPage'
import { BrandsPage } from './pages/BrandsPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { ProfilePage } from './pages/ProfilePage'
import { CartPage } from './pages/CartPage'
import { AuthProvider } from './hooks/useAuth'
import { CartProvider } from './hooks/useCart'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:category" element={<CategoryPage />} />
            <Route path="/catalog/:category/:product" element={<ProductPage />} />
            <Route path="/merken" element={<BrandsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:view?" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/over-ons" element={<AboutPage />} />
            <Route path="/bezorging" element={<DeliveryInformationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
