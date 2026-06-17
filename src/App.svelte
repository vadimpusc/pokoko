<script>
  import { onMount } from 'svelte';
  import { site } from './lib/content.js';

  /** @type {{ initialLocale?: 'en' | 'ja' }} */
  let { initialLocale = 'en' } = $props();
  const getInitialLocale = () => initialLocale;
  let locale = $state(getInitialLocale());
  let menuOpen = $state(false);
  let submitted = $state(false);
  let scrolled = $state(false);
  let copy = $derived(site[locale]);
  /** @type {'en' | 'ja'} */
  let otherLocale = $derived(locale === 'en' ? 'ja' : 'en');
  let schema = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CafeOrCoffeeShop',
      name: site.brand,
      description: copy.seo.description,
      slogan: locale === 'ja' ? '小さなことを、丁寧に。' : 'Little Things. Crafted Well.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kyoto',
        addressCountry: 'JP'
      },
      servesCuisine: ['Specialty Coffee', 'Homemade Food'],
      image: '/images/pokokoko-kyoto-coffee-bike.webp',
      sameAs: [site.social.instagram]
    }).replace(/</g, '\\u003c')
  );

  onMount(() => {
    const saved = localStorage.getItem('pokokoko-language');
    if ((saved === 'en' || saved === 'ja') && saved !== locale && window.location.pathname === '/') {
      switchLanguage(saved);
    }

    const onScroll = () => (scrolled = window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  /** @param {'en' | 'ja'} next */
  function switchLanguage(next) {
    locale = next;
    menuOpen = false;
    localStorage.setItem('pokokoko-language', next);
    const path = site[next].path;
    history.pushState({}, '', path);
    document.documentElement.lang = next;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeMenu() {
    menuOpen = false;
  }

  /** @param {SubmitEvent} event */
  function submitNewsletter(event) {
    event.preventDefault();
    submitted = true;
  }
</script>

<svelte:head>
  <title>{copy.seo.title}</title>
  <meta name="description" content={copy.seo.description} />
  <meta name="keywords" content={copy.seo.keywords} />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={copy.seo.title} />
  <meta property="og:description" content={copy.seo.description} />
  <meta property="og:image" content="/images/pokokoko-kyoto-coffee-bike.webp" />
  <meta property="og:locale" content={locale === 'ja' ? 'ja_JP' : 'en_US'} />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href={copy.path} />
  <link rel="alternate" hreflang="en" href="/" />
  <link rel="alternate" hreflang="ja" href="/ja/" />
  <link rel="alternate" hreflang="x-default" href="/" />
  {@html `<script type="application/ld+json">${schema}</script>`}
</svelte:head>

<header class:scrolled>
  <a class="brand" href={copy.path} aria-label="POKOKOKO home" onclick={closeMenu}>
    POKOKOKO
  </a>

  <nav class:open={menuOpen} aria-label="Main navigation">
    <a href="#story" onclick={closeMenu}>{copy.nav.story}</a>
    <a href="#craft" onclick={closeMenu}>{copy.nav.craft}</a>
    <a href="#menu" onclick={closeMenu}>{copy.nav.menu}</a>
    <a href="#visit" onclick={closeMenu}>{copy.nav.visit}</a>
  </nav>

  <div class="header-actions">
    <button
      class="language"
      onclick={() => switchLanguage(otherLocale)}
      aria-label={`Switch to ${site[otherLocale].languageName}`}
    >
      <span>{locale === 'en' ? 'EN' : 'JP'}</span>
      <i></i>
      <span>{locale === 'en' ? 'JP' : 'EN'}</span>
    </button>
    <button
      class="menu-toggle"
      class:active={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
    >
      <span></span><span></span>
    </button>
  </div>
</header>

<main>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-image">
      <img
        src="/images/pokokoko-kyoto-coffee-bike.webp"
        alt={copy.hero.imageAlt}
        width="1600"
        height="901"
        fetchpriority="high"
      />
    </div>
    <div class="hero-shade"></div>
    <div class="hero-content">
      <p class="eyebrow light">{copy.hero.eyebrow}</p>
      <h1 id="hero-title">
        <span>{copy.hero.title[0]}</span>
        <em>{copy.hero.title[1]}</em>
      </h1>
      <p class="hero-intro">{copy.hero.intro}</p>
      <div class="hero-ctas">
        <a class="button button-light" href="#visit">{copy.hero.cta}<span>↘</span></a>
        <a class="text-link light-link" href="#story">{copy.hero.secondary}<span>↓</span></a>
      </div>
    </div>
    <p class="hero-side">KYOTO · 35.0116° N, 135.7681° E</p>
    <div class="scroll-cue"><span></span>SCROLL</div>
  </section>

  <div class="ticker" aria-hidden="true">
    <div>
      {#each [...copy.ticker, ...copy.ticker] as item}
        <span>{item}<i>✦</i></span>
      {/each}
    </div>
  </div>

  <section class="story section-pad" id="story">
    <div class="section-number">{copy.story.number}</div>
    <div class="story-heading">
      <p class="eyebrow">{copy.story.eyebrow}</p>
      <h2>{copy.story.title}</h2>
    </div>
    <div class="story-body">
      {#each copy.story.body as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
    <blockquote>{copy.story.quote}</blockquote>
    <div class="coffee-mark" aria-hidden="true">
      <span>POKO</span>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="56"></circle>
        <path d="M45 32c15 10 22 42 6 59M75 28c-15 18-20 43-7 65"></path>
      </svg>
      <span>KOKO</span>
    </div>
  </section>

  <section class="name-section section-pad">
    <div class="name-intro">
      <p class="eyebrow light">{copy.name.eyebrow}</p>
      <h2>{copy.name.title}</h2>
      <p>{copy.name.intro}</p>
    </div>
    <div class="name-parts">
      {#each copy.name.parts as part, index}
        <article>
          <div class="word-row">
            <span>0{index + 1}</span>
            <h3>{part.word}</h3>
            <small>{part.pronunciation}</small>
          </div>
          <p>{part.text}</p>
        </article>
      {/each}
      <p class="together">{copy.name.together}</p>
    </div>
  </section>

  <section class="craft section-pad" id="craft">
    <div class="section-number">{copy.craft.number}</div>
    <div class="craft-title">
      <p class="eyebrow">{copy.craft.eyebrow}</p>
      <h2>{copy.craft.title}</h2>
      <p>{copy.craft.intro}</p>
    </div>
    <div class="values">
      {#each copy.craft.values as value}
        <article>
          <span>{value[0]}</span>
          <h3>{value[1]}</h3>
          <p>{value[2]}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="menu-section" id="menu">
    <div class="menu-photo">
      <img
        src="/images/pokokoko-kyoto-coffee-bike.webp"
        alt=""
        width="1600"
        height="901"
        loading="lazy"
      />
    </div>
    <div class="menu-copy">
      <p class="eyebrow light">{copy.menu.eyebrow}</p>
      <h2>{copy.menu.title}</h2>
      <p class="menu-note">{copy.menu.note}</p>
      <div class="menu-list">
        {#each copy.menu.items as item}
          <div><h3>{item[0]}</h3><span></span><p>{item[1]}</p></div>
        {/each}
      </div>
    </div>
  </section>

  <section class="visit section-pad" id="visit">
    <div class="section-number">{copy.visit.number}</div>
    <div class="visit-title">
      <p class="eyebrow">{copy.visit.eyebrow}</p>
      <h2>{copy.visit.title}</h2>
    </div>
    <div class="visit-details">
      <p>{copy.visit.body}</p>
      <a class="button button-dark" href={site.social.instagram} target="_blank" rel="noreferrer">
        {copy.visit.primary}<span>↗</span>
      </a>
    </div>
    <div class="schedule">
      <div class="schedule-label">{copy.visit.scheduleLabel}</div>
      {#each copy.visit.schedule as day}
        <div><strong>{day[0]}</strong><span>{day[1]}</span></div>
      {/each}
      <a href={site.social.maps} target="_blank" rel="noreferrer">{copy.visit.secondary} ↗</a>
    </div>
  </section>

  <section class="newsletter">
    <div>
      <p class="eyebrow light">{copy.newsletter.eyebrow}</p>
      <h2>{copy.newsletter.title}</h2>
    </div>
    {#if submitted}
      <p class="success" role="status">{copy.newsletter.success}</p>
    {:else}
      <form onsubmit={submitNewsletter}>
        <label class="sr-only" for="email">{copy.newsletter.placeholder}</label>
        <input id="email" type="email" required placeholder={copy.newsletter.placeholder} />
        <button type="submit">{copy.newsletter.button}<span>→</span></button>
        <small>{copy.newsletter.privacy}</small>
      </form>
    {/if}
  </section>
</main>

<footer>
  <div class="footer-brand">POKOKOKO</div>
  <div class="footer-bottom">
    <p>{copy.footer.line}</p>
    <div>
      <a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
      <button onclick={() => switchLanguage(otherLocale)}>
        {site[otherLocale].languageName}
      </button>
    </div>
    <p>© {new Date().getFullYear()} POKOKOKO · {copy.footer.rights}</p>
  </div>
</footer>
