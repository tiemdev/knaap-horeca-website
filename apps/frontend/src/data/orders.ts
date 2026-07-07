// Fake order history for the profile page — no backend to fetch real orders
// from yet. References product ids from ./products.ts.

export type OrderStatus = 'In behandeling' | 'Onderweg' | 'Geleverd' | 'Geannuleerd'

export type OrderLine = {
  productId: string
  quantity: number
}

export type Order = {
  id: string
  date: string
  status: OrderStatus
  lines: OrderLine[]
}

export const orders: Order[] = [
  {
    id: '100482',
    date: '18 juni 2026',
    status: 'Geleverd',
    lines: [
      { productId: 'bier-01', quantity: 4 },
      { productId: 'fris-01', quantity: 2 },
    ],
  },
  {
    id: '100501',
    date: '29 juni 2026',
    status: 'Onderweg',
    lines: [{ productId: 'wijn-01', quantity: 3 }],
  },
  {
    id: '100512',
    date: '5 juli 2026',
    status: 'In behandeling',
    lines: [
      { productId: 'koffie-01', quantity: 5 },
      { productId: 'nonfood-02', quantity: 10 },
    ],
  },
  {
    id: '100447',
    date: '2 juni 2026',
    status: 'Geannuleerd',
    lines: [{ productId: 'gedist-02', quantity: 2 }],
  },
]
