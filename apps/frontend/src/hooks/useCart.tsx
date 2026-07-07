import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useAuth } from './useAuth'

const CART_STORAGE_KEY = 'knaap_cart'

export type CartLine = {
  productId: string
  packagingIndex: number
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  count: number
  addItem: (productId: string, packagingIndex: number, quantity: number) => void
  updateQuantity: (productId: string, packagingIndex: number, quantity: number) => void
  removeItem: (productId: string, packagingIndex: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function sameLine(a: CartLine, productId: string, packagingIndex: number) {
  return a.productId === productId && a.packagingIndex === packagingIndex
}

// A cart only makes sense tied to a logged-in business account (prices are
// gated behind login too), so it's cleared whenever the user logs out.
export function CartProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth()
  const [lines, setLines] = useState<CartLine[]>(() => (isLoggedIn ? loadLines() : []))

  useEffect(() => {
    if (!isLoggedIn) {
      setLines([])
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [isLoggedIn])

  function persist(next: CartLine[]) {
    setLines(next)
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next))
  }

  function addItem(productId: string, packagingIndex: number, quantity: number) {
    const existing = lines.find(l => sameLine(l, productId, packagingIndex))
    if (existing) {
      persist(lines.map(l => (l === existing ? { ...l, quantity: l.quantity + quantity } : l)))
    } else {
      persist([...lines, { productId, packagingIndex, quantity }])
    }
  }

  function updateQuantity(productId: string, packagingIndex: number, quantity: number) {
    persist(lines.map(l => (sameLine(l, productId, packagingIndex) ? { ...l, quantity: Math.max(1, quantity) } : l)))
  }

  function removeItem(productId: string, packagingIndex: number) {
    persist(lines.filter(l => !sameLine(l, productId, packagingIndex)))
  }

  function clear() {
    persist([])
  }

  const count = lines.reduce((sum, l) => sum + l.quantity, 0)

  return (
    <CartContext.Provider value={{ lines, count, addItem, updateQuantity, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
