<script>
  import { site } from './lib/content.js';

  let { initialLocale = 'en' } = $props();
  const getInitialLocale = () => /** @type {'en' | 'ja'} */ (initialLocale);
  /** @type {'en' | 'ja'} */
  let locale = $state(getInitialLocale());

  /** @type {Record<'en' | 'ja', { hero: string[], comingSoon: string, storyTitle: string, story: string }>} */
  const welcome = {
    en: {
      hero: ['Little Things.', 'Crafted Well.'],
      comingSoon: 'We\'re coming soon.',
      storyTitle: 'Our story',
      story: 'POKOKOKO is a premium street coffee brand born in Kyoto. Attention to detail, craftsmanship, and genuine hospitality — a café-quality moment, brought directly to you.'
    },
    ja: {
      hero: ['小さなことを、', '丁寧に。'],
      comingSoon: 'もうすぐ、京都に登場します。',
      storyTitle: '私たちの物語',
      story: 'POKOKOKOは、京都で生まれたプレミアム・ストリートコーヒーブランドです。細部への心配り、確かな技術、心からのおもてなし。カフェクオリティのひとときを、あなたのすぐそばへ届けます。'
    }
  };

  let copy = $derived(welcome[locale]);
  /** @type {'en' | 'ja'} */
  let otherLocale = $derived(locale === 'en' ? 'ja' : 'en');

  /** @param {'en' | 'ja'} next */
  function switchLanguage(next) {
    locale = next;
    document.documentElement.lang = next;
  }
</script>

<main class="page">
  <div class="bg">
    <img
      src="/images/pokokoko-kyoto-coffee-bike.webp"
      alt=""
      width="1600"
      height="901"
    />
  </div>
  <div class="shade"></div>

  <header>
    <a class="brand" href="/" aria-label="POKOKOKO home">POKOKOKO</a>
    <button
      class="language"
      onclick={() => switchLanguage(otherLocale)}
      aria-label={`Switch to ${locale === 'en' ? '日本語' : 'English'}`}
    >
      <span>{locale === 'en' ? 'EN' : 'JP'}</span>
      <i></i>
      <span>{locale === 'en' ? 'JP' : 'EN'}</span>
    </button>
  </header>

  <div class="center">
    <h1>
      <span>{copy.hero[0]}</span>
      <em>{copy.hero[1]}</em>
    </h1>
    <p class="coming">{copy.comingSoon}</p>
  </div>

  <div class="bottom">
    <p class="story-label">{copy.storyTitle}</p>
    <p class="story-text">{copy.story}</p>
    <a class="social" href={site.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
  </div>
</main>

<style>
  .page {
    height: 100svh;
    position: relative;
    overflow: hidden;
    color: #fff;
    display: flex;
    flex-direction: column;
  }
  .bg {
    position: absolute;
    inset: 0;
  }
  .bg img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    animation: hero-in 1.5s cubic-bezier(.2,.7,.2,1) both;
  }
  .shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(10,16,12,.7) 0%, rgba(10,16,12,.25) 52%, rgba(10,16,12,.2) 100%),
                linear-gradient(0deg, rgba(10,16,12,.4), transparent 45%);
  }

  header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 4vw;
  }
  .brand {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: .12em;
  }
  .language {
    border: 0;
    background: transparent;
    color: #fff;
    padding: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 11px;
    letter-spacing: .1em;
  }
  .language i {
    display: block;
    width: 28px;
    height: 1px;
    background: currentColor;
    opacity: .5;
  }
  .language span:last-child {
    opacity: .55;
  }

  .center {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 4vw;
  }
  .center h1 {
    font-size: clamp(62px, 8vw, 125px);
    line-height: .88;
    font-weight: 400;
    letter-spacing: -.055em;
  }
  .center h1 span,
  .center h1 em {
    display: block;
  }
  .center h1 em {
    font-family: 'Playfair Display', serif;
    font-weight: 500;
  }
  .coming {
    margin-top: 32px;
    font-size: 20px;
    font-weight: 300;
    opacity: .85;
  }

  .bottom {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 32px 4vw;
    border-top: 1px solid rgba(255,255,255,.2);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.6;
  }
  .story-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .15em;
    text-transform: uppercase;
    opacity: .6;
    white-space: nowrap;
  }
  .story-text {
    opacity: .8;
    max-width: 600px;
  }
  .social {
    margin-left: auto;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    white-space: nowrap;
    opacity: .8;
  }

  @media (max-width: 650px) {
    header {
      padding: 24px 22px;
    }
    .center h1 {
      font-size: clamp(52px, 17vw, 78px);
    }
    .coming {
      font-size: 16px;
    }
    .bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 24px 22px;
    }
    .social {
      margin-left: 0;
    }
  }

  @keyframes hero-in {
    from { transform: scale(1.07); filter: brightness(.6); }
    to { transform: scale(1); filter: brightness(1); }
  }
</style>
