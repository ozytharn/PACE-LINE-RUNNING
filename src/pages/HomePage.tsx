import { useState } from 'react'
import {
  categories,
  filters,
  formatPrice,
  products,
} from '../data/catalog'
import type { Product, ProductCategory, StoreFilter } from '../data/catalog'
import { SectionLabel } from '../components/StoreChrome'

const heroSlides = [
  {
    label: 'AUTUMN / WINTER ’26 COLLECTION',
    title: ['Chase', 'Every Second.'],
    description:
      'Race-day gear, trail-tested essentials, and everyday kit — curated by runners, worn on every terrain.',
    image: '/assets/home-hero.webp',
    imageAlt: 'Runner crossing a sunlit mountain landscape',
    action: 'SHOP NEW ARRIVALS',
    filter: 'New In',
  },
  {
    label: 'TRAIL TESTED · EVERY TERRAIN',
    title: ['Go beyond', 'the road.'],
    description:
      'Find the grip, protection, and confidence to take your next run off the beaten path.',
    image: '/assets/home-category-trail.webp',
    imageAlt: 'Trail runner crossing a rocky path',
    action: 'SHOP TRAIL RUNNING',
    filter: 'Trail Running',
  },
  {
    label: 'YOUR MILE · YOUR PACE',
    title: ['Run your', 'own line.'],
    description:
      'Thoughtful layers and everyday essentials, selected by runners who know the miles.',
    image: '/assets/home-male.webp',
    imageAlt: 'Runner training on an outdoor track',
    action: 'EXPLORE APPAREL',
    filter: 'Apparel',
  },
] satisfies {
  label: string
  title: [string, string]
  description: string
  image: string
  imageAlt: string
  action: string
  filter: StoreFilter
}[]

export function HomePage({
  onAddToCart,
  announce,
}: {
  onAddToCart: (product: Product) => void
  announce: (message: string) => void
}) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [filter, setFilter] = useState<StoreFilter>(() => {
    const requestedFilter = new URLSearchParams(window.location.search).get(
      'filter',
    )
    const category = categories.find((item) => item.title === requestedFilter)
    const quickFilter = filters.find((item) => item === requestedFilter)
    const audience = (['Men', 'Women'] as const).find(
      (item) => item === requestedFilter,
    )
    return category?.title ?? quickFilter ?? audience ?? 'New In'
  })
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set())
  const currentSlide = heroSlides[activeSlide]
  const visibleProducts = products.filter((product) => {
    if (filter === 'Men')
      return product.audience === 'Men' || product.audience === 'Unisex'
    if (filter === 'Women')
      return product.audience === 'Women' || product.audience === 'Unisex'
    return product.category === filter || product.tags.includes(filter)
  })

  function showProducts(selectedFilter: StoreFilter) {
    setFilter(selectedFilter)
    window.setTimeout(
      () => document.getElementById('arrivals')?.scrollIntoView(),
      0,
    )
  }

  function selectCategory(category: ProductCategory) {
    showProducts(category)
  }

  function toggleWishlist(product: Product) {
    const isSaved = wishlist.has(product.id)
    setWishlist((current) => {
      const updated = new Set(current)
      if (updated.has(product.id)) updated.delete(product.id)
      else updated.add(product.id)
      return updated
    })
    announce(
      isSaved
        ? `${product.name} removed from your saved items.`
        : `${product.name} added to your saved items.`,
    )
  }

  return (
    <main id="main-content">
      <section
        className="hero"
        aria-label="Featured running collections"
        aria-roledescription="carousel"
      >
        <img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.imageAlt}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-overlay" aria-live="polite">
          <SectionLabel>{currentSlide.label}</SectionLabel>
          <h1 id="home-title">
            {currentSlide.title[0]}
            <br />
            {currentSlide.title[1]}
          </h1>
          <p>{currentSlide.description}</p>
          <div className="hero-actions">
            <a
              className="button button-lime"
              href="#arrivals"
              onClick={() => showProducts(currentSlide.filter)}
            >
              {currentSlide.action}&nbsp; →
            </a>
            <a className="button button-outline" href="/about">
              READ OUR STORY
            </a>
          </div>
        </div>
        <div className="hero-dots" role="group" aria-label="Choose a featured collection">
          {heroSlides.map((slide, index) => (
            <button
              className="hero-dot"
              key={slide.label}
              type="button"
              aria-label={`Show collection ${index + 1}: ${slide.label}`}
              aria-pressed={activeSlide === index}
              onClick={() => setActiveSlide(index)}
            >
              <span className="hero-dot-bar" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section
        className="content-section category-section"
        id="categories"
        aria-labelledby="categories-title"
      >
        <div className="section-heading">
          <div>
            <SectionLabel>01 · SHOP BY CATEGORY</SectionLabel>
            <h2 id="categories-title">Every discipline. Every distance.</h2>
          </div>
          <a className="arrow-link" href="#arrivals">
            VIEW COLLECTIONS <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <a
              className="image-card"
              href="#arrivals"
              id={category.title.toLowerCase().replace(' ', '-')}
              key={category.title}
              onClick={() => selectCategory(category.title)}
            >
              <img
                src={category.image}
                alt={category.imageAlt}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{category.title}</h3>
                <p>{category.detail}</p>
                <span>SHOP →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section
        id="arrivals"
        className="content-section arrivals-section"
        aria-labelledby="arrivals-title"
      >
        <div className="section-heading arrivals-heading">
          <div>
            <SectionLabel>02 · JUST LANDED</SectionLabel>
            <h2 id="arrivals-title">New arrivals for the run.</h2>
          </div>
          <div className="filter-controls">
            <div className="filters" role="group" aria-label="Filter products">
              {filters.map((item) => (
                <button
                  className={filter === item ? 'active' : ''}
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
              {filter !== 'New In' && (
                <button
                  className="clear-filter"
                  type="button"
                  onClick={() => setFilter('New In')}
                >
                  Clear
                </button>
              )}
            </div>
            {filter !== 'New In' && (
              <p className="filter-state">
                Showing <strong>{filter}</strong>
              </p>
            )}
          </div>
        </div>
        <p className="visually-hidden" role="status" aria-live="polite">
          Showing {visibleProducts.length} products for {filter}.
        </p>
        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const isSaved = wishlist.has(product.id)
              return (
                <article
                  className="product-card"
                  id={`product-${product.id}`}
                  key={product.id}
                >
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}
                    <button
                      className={`wishlist-button${isSaved ? ' saved' : ''}`}
                      type="button"
                      aria-label={`${isSaved ? 'Remove' : 'Save'} ${product.name} ${isSaved ? 'from' : 'to'} wishlist`}
                      aria-pressed={isSaved}
                      onClick={() => toggleWishlist(product)}
                    >
                      <span aria-hidden="true">{isSaved ? '♥' : '♡'}</span>
                    </button>
                    <button
                      className="add-to-bag"
                      type="button"
                      onClick={() => {
                        onAddToCart(product)
                        announce(`${product.name} added to your bag.`)
                      }}
                    >
                      ADD TO BAG
                    </button>
                  </div>
                  <p className="product-brand">{product.brand}</p>
                  <h3>{product.name}</h3>
                  <p className="product-meta">{product.category}</p>
                  <p className="product-price">{formatPrice(product.price)}</p>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="empty-results">
            No products match this selection yet. Choose another category.
          </p>
        )}
      </section>

      <section className="story-split" id="story" aria-labelledby="story-title">
        <img
          src="/assets/home-story.webp"
          alt="Runner reaching a mountain summit"
          loading="lazy"
          decoding="async"
        />
        <div>
          <SectionLabel>OUR STORY</SectionLabel>
          <h2 id="story-title">
            Built by runners.
            <br />
            Worn on every terrain.
          </h2>
          <p>
            PACELINE opened in 2015 with one goal — to become an all-inclusive
            hub for runners. Twenty seasons in, we still hand-pick every shoe,
            every layer and every accessory in our range.
          </p>
          <div className="stats" aria-label="Paceline at a glance">
            <div>
              <b>10+</b>
              <span>YEARS IN SPORT</span>
            </div>
            <div>
              <b>40+</b>
              <span>BRANDS</span>
            </div>
            <div>
              <b>1</b>
              <span>STORE IN GLASGOW</span>
            </div>
          </div>
          <a className="button button-outline" href="/about">
            READ THE FULL STORY&nbsp; →
          </a>
        </div>
      </section>

      <section
        className="explore-grid content-section"
        aria-label="Shop running collections"
      >
        <a
          className="explore-card"
          id="mens-running"
          href="#arrivals"
          onClick={() => setFilter('Men')}
        >
          <img
            src="/assets/home-male.webp"
            alt="Man running on an outdoor track"
            loading="lazy"
            decoding="async"
          />
          <h2>Men’s Running</h2>
          <span>SHOP NOW →</span>
        </a>
        <a
          className="explore-card"
          id="womens-running"
          href="#arrivals"
          onClick={() => setFilter('Women')}
        >
          <img
            src="/assets/home-female.webp"
            alt="Woman training on an outdoor track"
            loading="lazy"
            decoding="async"
          />
          <h2>Women’s Running</h2>
          <span>SHOP NOW →</span>
        </a>
      </section>
    </main>
  )
}
