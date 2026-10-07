import { useEffect, useRef, useState } from 'react'
import type { Product } from './data/catalog'
import type { CartLine, Overlay } from './data/catalog'
import {
  AccountDialog,
  CartDialog,
  Footer,
  Header,
  MobileMenu,
  SearchDialog,
} from './components/StoreChrome'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import './index.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [cart, setCart] = useState<CartLine[]>([])
  const [announcement, setAnnouncement] = useState('')
  const previousOverlay = useRef<Overlay>(null)
  const dialogTrigger = useRef<HTMLElement | null>(null)
  const isAboutPage = path.replace(/\/+$/, '') === '/about'
  const cartCount = cart.reduce((count, line) => count + line.quantity, 0)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (previousOverlay.current !== null && overlay === null) {
      dialogTrigger.current?.focus()
    }
    previousOverlay.current = overlay
  }, [overlay])

  useEffect(() => {
    document.body.classList.toggle('dialog-open', overlay !== null)
    return () => document.body.classList.remove('dialog-open')
  }, [overlay])

  function openOverlay(nextOverlay: Overlay) {
    if (nextOverlay !== null && document.activeElement instanceof HTMLElement) {
      dialogTrigger.current = document.activeElement
    }
    setOverlay(nextOverlay)
  }

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id)
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: Math.min(99, line.quantity + 1) }
            : line,
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  function changeQuantity(id: string, quantity: number) {
    const safeQuantity = Number.isFinite(quantity)
      ? Math.min(99, Math.max(1, Math.floor(quantity)))
      : 1
    setCart((current) =>
      current.map((line) =>
        line.product.id === id ? { ...line, quantity: safeQuantity } : line,
      ),
    )
  }

  function announce(message: string) {
    setAnnouncement('')
    window.requestAnimationFrame(() => setAnnouncement(message))
  }

  function chooseSearchResult(product: Product) {
    setOverlay(null)
    window.location.assign(
      `/?filter=${encodeURIComponent(product.category)}#product-${product.id}`,
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onOpen={openOverlay}
        activeOverlay={overlay}
      />
      {isAboutPage ? (
        <AboutPage />
      ) : (
        <HomePage onAddToCart={addToCart} announce={announce} />
      )}
      <Footer />
      <p className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </p>
      {overlay === 'menu' && (
        <MobileMenu onClose={() => setOverlay(null)} />
      )}
      {overlay === 'search' && (
        <SearchDialog
          onClose={() => setOverlay(null)}
          onChooseProduct={chooseSearchResult}
        />
      )}
      {overlay === 'account' && (
        <AccountDialog onClose={() => setOverlay(null)} />
      )}
      {overlay === 'cart' && (
        <CartDialog
          cart={cart}
          onClose={() => setOverlay(null)}
          onRemove={(id) =>
            setCart((current) =>
              current.filter((line) => line.product.id !== id),
            )
          }
          onQuantityChange={changeQuantity}
        />
      )}
    </>
  )
}

export default App
