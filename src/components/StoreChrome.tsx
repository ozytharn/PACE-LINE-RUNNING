import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, MouseEvent, ReactNode } from 'react'
import { formatPrice, products } from '../data/catalog'
import type { CartLine, Overlay, Product } from '../data/catalog'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4 4" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

export function Header({
  cartCount,
  onOpen,
  activeOverlay,
}: {
  cartCount: number
  onOpen: (overlay: Overlay) => void
  activeOverlay: Overlay
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <span>FREE UK DELIVERY OVER £75&nbsp; · &nbsp;30-DAY RETURNS</span>
        <strong>AUTUMN '26 → NEW ARRIVALS DROPPING WEEKLY</strong>
        <span>STORE: GLASGOW&nbsp; · &nbsp;EN / £ GBP</span>
      </div>
      <header className="site-header">
        <button
          className="menu-button"
          type="button"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-expanded={activeOverlay === 'menu'}
          onClick={() => onOpen('menu')}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <a className="logo" href="/" aria-label="Paceline home">
          PACELINE
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/#mens-running">Men</a>
          <a href="/#womens-running">Women</a>
          <a href="/#categories">Footwear</a>
          <a href="/#apparel">Apparel</a>
          <a href="/#story">Brands</a>
          <a href="/#arrivals">Sale</a>
          <a href="/about">About</a>
        </nav>
        <div className="header-actions" aria-label="Store tools">
          <button
            type="button"
            aria-label="Search products"
            aria-haspopup="dialog"
            aria-expanded={activeOverlay === 'search'}
            onClick={() => onOpen('search')}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label="Account information"
            aria-haspopup="dialog"
            aria-expanded={activeOverlay === 'account'}
            onClick={() => onOpen('account')}
          >
            <AccountIcon />
          </button>
          <button
            type="button"
            aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            aria-haspopup="dialog"
            aria-expanded={activeOverlay === 'cart'}
            onClick={() => onOpen('cart')}
          >
            <BagIcon />
            <span className="bag-count" aria-hidden="true">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    </>
  )
}

function StoreDialog({
  title,
  onClose,
  children,
  className = '',
}: {
  title: string
  onClose: () => void
  children: ReactNode
  className?: string
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [])

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={`store-dialog ${className}`}
      aria-labelledby="store-dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          onClose()
        }
      }}
      onClick={closeOnBackdrop}
    >
      <div className="dialog-heading">
        <h2 id="store-dialog-title">{title}</h2>
        <button
          type="button"
          className="dialog-close"
          aria-label={`Close ${title.toLowerCase()}`}
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      {children}
    </dialog>
  )
}

export function SearchDialog({
  onClose,
  onChooseProduct,
}: {
  onClose: () => void
  onChooseProduct: (product: Product) => void
}) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return []
    return products.filter((product) =>
      [product.name, product.brand, product.category, product.audience]
        .join(' ')
        .toLowerCase()
        .includes(search),
    )
  }, [query])

  return (
    <StoreDialog
      title="Search Paceline"
      onClose={onClose}
      className="search-dialog"
    >
      <label className="visually-hidden" htmlFor="store-search">
        Search products
      </label>
      <input
        id="store-search"
        className="search-input"
        type="search"
        autoComplete="off"
        autoFocus
        placeholder="Shoes, apparel, accessories…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="search-results" aria-live="polite">
        {!query.trim() && <p>Try a brand, product, or category.</p>}
        {query.trim() && results.length === 0 && (
          <p>No products found for “{query.trim()}”. Try another search.</p>
        )}
        {results.map((product) => (
          <button
            className="search-result"
            key={product.id}
            type="button"
            onClick={() => onChooseProduct(product)}
          >
            <span>{product.name}</span>
            <span>{formatPrice(product.price)}</span>
          </button>
        ))}
      </div>
    </StoreDialog>
  )
}

export function AccountDialog({ onClose }: { onClose: () => void }) {
  return (
    <StoreDialog title="Your Paceline account" onClose={onClose}>
      <div className="dialog-copy">
        <p>
          Account sign-in is not connected in this frontend demo. You can still
          browse the collection and use the local shopping bag.
        </p>
        <a className="button button-dark" href="/#newsletter">
          JOIN THE PACELINE CLUB
        </a>
      </div>
    </StoreDialog>
  )
}

export function CartDialog({
  cart,
  onClose,
  onRemove,
  onQuantityChange,
}: {
  cart: CartLine[]
  onClose: () => void
  onRemove: (id: string) => void
  onQuantityChange: (id: string, quantity: number) => void
}) {
  const total = cart.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  )

  return (
    <StoreDialog
      title="Your shopping bag"
      onClose={onClose}
      className="cart-dialog"
    >
      {cart.length === 0 ? (
        <div className="dialog-copy">
          <p>Your bag is empty. Find something for your next run.</p>
          <a className="button button-dark" href="/#arrivals">
            EXPLORE NEW ARRIVALS
          </a>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(({ product, quantity }) => (
              <li className="cart-line" key={product.id}>
                <img src={product.image} alt="" />
                <div className="cart-line-info">
                  <strong>{product.name}</strong>
                  <span>{formatPrice(product.price)}</span>
                  <label>
                    Quantity
                    <input
                      type="number"
                      min="1"
                      max="99"
                      inputMode="numeric"
                      aria-label={`Quantity of ${product.name}`}
                      value={quantity}
                      onChange={(event) =>
                        onQuantityChange(product.id, Number(event.target.value))
                      }
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  aria-label={`Remove ${product.name} from bag`}
                  onClick={() => onRemove(product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <p className="demo-note">
            This is a front-end preview. Checkout and payment are not connected.
          </p>
        </>
      )}
    </StoreDialog>
  )
}

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <StoreDialog
      title="Explore Paceline"
      onClose={onClose}
      className="mobile-menu-dialog"
    >
      <nav className="mobile-links" aria-label="Mobile navigation">
        <a href="/#mens-running">Men</a>
        <a href="/#womens-running">Women</a>
        <a href="/#categories">Footwear</a>
        <a href="/#apparel">Apparel</a>
        <a href="/#story">Brands</a>
        <a href="/#arrivals">Sale</a>
        <a href="/about">About</a>
      </nav>
    </StoreDialog>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setMessage(
      'Thanks for your interest. This demo does not send or store email addresses.',
    )
    setEmail('')
  }

  return (
    <footer className="site-footer" id="newsletter">
      <div className="newsletter">
        <div>
          <h2>Join the Paceline club.</h2>
          <p>
            Early access to new drops, race-day tips, and 10% off your first
            order.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={submit}>
          <label className="visually-hidden" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
            value={email}
            aria-describedby="newsletter-status"
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit">SUBSCRIBE</button>
        </form>
        <p className="form-message" id="newsletter-status" role="status">
          {message}
        </p>
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="footer-logo" href="/" aria-label="Paceline home">
            PACELINE
          </a>
          <p>
            Race-day gear, trail-tested essentials, and everyday running kit —
            curated in Glasgow since 2015.
          </p>
        </div>
        <FooterColumn
          title="SHOP"
          links={[
            { label: 'Men’s running', href: '/#mens-running' },
            { label: 'Women’s running', href: '/#womens-running' },
            { label: 'Footwear', href: '/#categories' },
            { label: 'Apparel', href: '/#apparel' },
            { label: 'Accessories', href: '/#accessories' },
            { label: 'Sale & new arrivals', href: '/#arrivals' },
          ]}
        />
        <FooterColumn
          title="HELP"
          links={[
            { label: 'Contact', href: 'mailto:teamdcs.web@gmail.com' },
            {
              label: 'Shipping',
              href: 'mailto:teamdcs.web@gmail.com?subject=Shipping%20question',
            },
            {
              label: 'Returns',
              href: 'mailto:teamdcs.web@gmail.com?subject=Returns%20question',
            },
            {
              label: 'Gait analysis',
              href: 'mailto:teamdcs.web@gmail.com?subject=Gait%20analysis',
            },
            {
              label: 'FAQs',
              href: 'mailto:teamdcs.web@gmail.com?subject=Question',
            },
          ]}
        />
        <FooterColumn
          title="COMPANY"
          links={[
            { label: 'About us', href: '/about' },
            { label: 'Visit Glasgow', href: '/about#visit' },
            {
              label: 'Careers & wholesale',
              href: 'mailto:teamdcs.web@gmail.com?subject=Paceline%20enquiry',
            },
          ]}
        />
        <div className="footer-follow">
          <h3>FOLLOW</h3>
          <p>Find Paceline on your favourite running and social platforms.</p>
          <a href="mailto:teamdcs.web@gmail.com?subject=Paceline%20social%20links">
            Ask us for our social links
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Paceline Running Co. — All rights reserved.</p>
        <p className="demo-note">
          Front-end demo: no orders, payments, or email subscriptions are sent.
        </p>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) => (
        <a href={link.href} key={link.label}>
          {link.label}
        </a>
      ))}
    </div>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>
}
