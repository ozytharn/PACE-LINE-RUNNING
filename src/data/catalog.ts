export type ProductCategory =
  | 'Road Running'
  | 'Trail Running'
  | 'Apparel'
  | 'Accessories'

export type StoreFilter =
  | 'New In'
  | 'Best Sellers'
  | 'Race Day'
  | 'Trail'
  | ProductCategory
  | 'Men'
  | 'Women'

export type Product = {
  id: string
  brand: string
  name: string
  price: number
  image: string
  imageAlt: string
  category: ProductCategory
  audience: 'Men' | 'Women' | 'Unisex'
  tags: StoreFilter[]
  badge?: 'NEW' | 'SALE'
}

export type CartLine = { product: Product; quantity: number }
export type Overlay = 'search' | 'account' | 'cart' | 'menu' | null

export const products: Product[] = [
  {
    id: 'cloudmonster',
    brand: 'ON',
    name: 'Cloudmonster 3 — Hyper Lily',
    price: 210,
    image: '/assets/home-arrivals.webp',
    imageAlt: 'Performance running shoe in a studio setting',
    category: 'Road Running',
    audience: 'Unisex',
    tags: ['New In', 'Best Sellers', 'Race Day', 'Road Running'],
    badge: 'NEW',
  },
  {
    id: 'vaporfly',
    brand: 'Nike',
    name: 'Vaporfly 4 — Volt Ice',
    price: 240,
    image: '/assets/home-arrivals.webp',
    imageAlt: 'Performance running shoe in a studio setting',
    category: 'Road Running',
    audience: 'Unisex',
    tags: ['New In', 'Race Day', 'Road Running'],
    badge: 'NEW',
  },
  {
    id: 'tecton',
    brand: 'Hoka',
    name: 'Tecton X 4 — Frost / Tangerine',
    price: 220,
    image: '/assets/home-category-trail.webp',
    imageAlt: 'Trail runner crossing a rocky path',
    category: 'Trail Running',
    audience: 'Unisex',
    tags: ['New In', 'Trail'],
    badge: 'NEW',
  },
  {
    id: 'megablast',
    brand: 'Asics',
    name: 'Megablast — White / Orange Glow',
    price: 210,
    image: '/assets/home-arrivals.webp',
    imageAlt: 'Performance running shoe in a studio setting',
    category: 'Road Running',
    audience: 'Unisex',
    tags: ['New In', 'Best Sellers', 'Road Running'],
    badge: 'SALE',
  },
  {
    id: 'tempo-vest',
    brand: 'Tracksmith',
    name: 'Allston Tempo Vest',
    price: 88,
    image: '/assets/home-female.webp',
    imageAlt: 'Runner training in a lightweight running vest',
    category: 'Apparel',
    audience: 'Women',
    tags: ['Apparel', 'Women'],
    badge: 'NEW',
  },
  {
    id: 'wind-shell',
    brand: 'Soar',
    name: 'Weatherproof Run Shell',
    price: 165,
    image: '/assets/home-male.webp',
    imageAlt: 'Runner training outdoors in technical running apparel',
    category: 'Apparel',
    audience: 'Men',
    tags: ['Apparel', 'Men'],
  },
  {
    id: 'pace-watch',
    brand: 'Garmin',
    name: 'Forerunner GPS Watch',
    price: 299,
    image: '/assets/home-category-accessories.webp',
    imageAlt: 'Running watch for tracking distance and pace',
    category: 'Accessories',
    audience: 'Unisex',
    tags: ['Accessories'],
  },
  {
    id: 'trail-belt',
    brand: 'Salomon',
    name: 'Active Hydration Belt',
    price: 45,
    image: '/assets/home-category-trail.webp',
    imageAlt: 'Trail running essentials for long-distance routes',
    category: 'Accessories',
    audience: 'Unisex',
    tags: ['Accessories', 'Trail'],
  },
]

export const categories: {
  title: ProductCategory
  detail: string
  image: string
  imageAlt: string
}[] = [
  {
    title: 'Road Running',
    detail: 'Speed, cushion, race-day.',
    image: '/assets/home-category-road.webp',
    imageAlt: 'Road runner moving through a city street',
  },
  {
    title: 'Trail Running',
    detail: 'Grip, protection, adventure.',
    image: '/assets/home-category-trail.webp',
    imageAlt: 'Runner navigating a rocky trail',
  },
  {
    title: 'Apparel',
    detail: 'Layers built for every mile.',
    image: '/assets/home-category-apparel.webp',
    imageAlt: 'Runner wearing technical training apparel',
  },
  {
    title: 'Accessories',
    detail: 'Watches, packs, fuel.',
    image: '/assets/home-category-accessories.webp',
    imageAlt: 'Sports watch and running accessories',
  },
]

export const filters: StoreFilter[] = [
  'New In',
  'Best Sellers',
  'Race Day',
  'Trail',
]

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price)
}
