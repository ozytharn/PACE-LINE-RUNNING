import { SectionLabel } from '../components/StoreChrome'

export function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <section
        className="about-intro content-section"
        aria-labelledby="about-title"
      >
        <p className="breadcrumbs">
          <a href="/">HOME</a> / ABOUT
        </p>
        <h1 id="about-title">Our Story</h1>
        <p>
          We opened Paceline in 2015 with one goal — to build the running shop
          we’d always wanted. A decade in, we’re still hand-picking every shoe,
          every layer and every accessory for runners just like us.
        </p>
        <img
          src="/assets/about-hero.webp"
          alt="Runners’ shoes gathering at a race start line"
          fetchPriority="high"
          decoding="async"
        />
      </section>

      <section
        className="about-origin content-section"
        aria-labelledby="origin-title"
      >
        <div>
          <SectionLabel>01 · WHY WE EXIST</SectionLabel>
          <h2 id="origin-title">
            We’re all
            <br />
            about the run.
          </h2>
        </div>
        <div>
          <p>
            If your aim is 5k or 26.2 miles, road or trail, we’re here to prepare,
            empower and equip you — from your first training run through to
            race-day. Our tried-and-tested range covers road, trail, track and
            field, apparel and accessories, with no compromise on performance or
            style.
          </p>
          <p>
            Paceline is small and independent, but the community around it is
            anything but. We run our own weekly club, host free gait analysis,
            and partner with local charities so 20% of profits from kids’ kits
            go to Girls Run Glasgow.
          </p>
          <p className="signature">— Rae &amp; Jamie, Founders</p>
        </div>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="content-section">
          <SectionLabel>02 · WHAT WE STAND FOR</SectionLabel>
          <h2 id="principles-title">Three things we won’t compromise on.</h2>
          <div className="principle-grid">
            {[
              ['01', 'Curated, not sold to us.'],
              ['02', 'Community over transaction.'],
              ['03', 'Craft in every detail.'],
            ].map(([number, title]) => (
              <article className="principle" key={number}>
                <p className="principle-number">{number}</p>
                <h3>{title}</h3>
                <p>
                  Every brand we carry has been tested, worn and vouched for by
                  our team. If it doesn’t perform on a Glasgow winter long run,
                  it doesn’t hit our wall.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="timeline content-section"
        aria-labelledby="timeline-title"
      >
        <SectionLabel>03 · TEN SEASONS IN</SectionLabel>
        <h2 id="timeline-title">How we got here.</h2>
        <div className="timeline-grid">
          {[
            [
              '2015',
              'Doors open.',
              'Rae opens a 40 sqm shop on Great Western Road with 3 shoe brands and a lot of hope.',
            ],
            [
              '2018',
              'The clinic launches.',
              'Free gait analysis and injury consults every Saturday — booked out in weeks.',
            ],
            [
              '2022',
              'Weekly run club.',
              'Every Wednesday, rain or shine. Started with 6 runners, now averages 80+.',
            ],
            [
              '2026',
              '40 brands & counting.',
              'Twenty seasons in, still hand-picking every product. Same team, same goal.',
            ],
          ].map(([year, title, detail]) => (
            <article key={year}>
              <p className="timeline-year">{year}</p>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <div>
          <SectionLabel>04 · COME SAY HI</SectionLabel>
          <h2 id="visit-title">Visit us in Glasgow.</h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Great+Western+Road%2C+Glasgow"
            target="_blank"
            rel="noreferrer"
          >
            FIND GREAT WESTERN ROAD <span aria-hidden="true">↗</span>
          </a>
        </div>
        <img
          src="/assets/about-map.webp"
          alt="Illustrated map highlighting the Paceline store area in Glasgow"
          loading="lazy"
          decoding="async"
        />
      </section>

      <section
        className="founders content-section"
        aria-labelledby="founders-title"
      >
        <SectionLabel>05 · MEET THE FOUNDERS</SectionLabel>
        <h2 id="founders-title">The people behind the shop.</h2>
        <div className="founder-grid">
          {[
            {
              name: 'Rae Sinclair',
              role: 'Founder & Head Buyer',
              image: '/assets/about-founder-rae.webp',
              copy: 'A former GB triathlete turned shopkeeper. Rae hand-picks every shoe on the wall and still runs the Wednesday club — sub-3 marathoner, twelve times over.',
            },
            {
              name: 'Jamie Roy',
              role: 'Co-Founder & Coach',
              image: '/assets/about-founder-jamie.webp',
              copy: 'Sports physio and coach with two decades in the sport. Runs our free Saturday clinic, coaches the club, and knows more about your gait than you do.',
            },
          ].map((founder) => (
            <article className="founder-card" key={founder.name}>
              <img
                src={founder.image}
                alt={founder.name}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <p>{founder.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta" aria-labelledby="cta-title">
        <SectionLabel>READY TO RUN?</SectionLabel>
        <h2 id="cta-title">
          Come find your next
          <br />
          pair of shoes.
        </h2>
        <div>
          <a className="button button-dark" href="/#arrivals">
            SHOP FOOTWEAR
          </a>
          <a
            className="button button-dark-outline"
            href="mailto:teamdcs.web@gmail.com?subject=Book%20a%20gait%20analysis"
          >
            BOOK GAIT ANALYSIS
          </a>
        </div>
      </section>
    </main>
  )
}
