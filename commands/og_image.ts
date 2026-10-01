import { mkdir, readFile } from 'node:fs/promises'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { SITE_NAME, SOCIAL_CARD } from '#config/seo'
import { LOCALES, type Locale } from '#shared/locales'

const escapeHtml = (value: string) => value.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`)

/**
 * Renders the social cards (Open Graph / X) into public/og/, one per
 * language, from the brand name and SOCIAL_CARD in config/seo.ts:
 *
 *   node ace og:image
 *
 * A development tool: it drives headless Chromium through Playwright (a
 * dev dependency, loaded only when the command runs). Commit the images.
 */
export default class OgImage extends BaseCommand {
  static commandName = 'og:image'
  static description = 'Render the Open Graph / X social cards into public/og'
  static options: CommandOptions = { startApp: true }

  async run() {
    const { chromium } = await import('playwright')
    const mark = await readFile(this.app.makePath('inertia/assets/brand/mlmsofts-mark.png'))
    await mkdir(this.app.publicPath('og'), { recursive: true })

    // Playwright's own Chromium, or the installed Google Chrome when that build is missing
    const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }))
    try {
      const page = await browser.newPage({
        viewport: { width: SOCIAL_CARD.width, height: SOCIAL_CARD.height },
      })
      for (const locale of LOCALES) {
        await page.setContent(this.#html(locale, mark.toString('base64')), { waitUntil: 'load' })
        await page.evaluate('document.fonts.ready')
        const file = this.app.publicPath(SOCIAL_CARD.path(locale).slice(1))
        await page.screenshot({ path: file, type: 'jpeg', quality: 88 })
        this.logger.success(`wrote ${this.app.relativePath(file)}`)
      }
    } finally {
      await browser.close()
    }
  }

  #html(locale: Locale, markBase64: string) {
    return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Manrope:wght@700;800&display=swap">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: ${SOCIAL_CARD.width}px; height: ${SOCIAL_CARD.height}px; overflow: hidden;
    font-family: Inter, -apple-system, 'Helvetica Neue', Arial, sans-serif;
    color: #eef4fc;
    background:
      radial-gradient(640px 420px at 88% 18%, rgba(6, 200, 245, 0.22), transparent 70%),
      radial-gradient(560px 480px at 72% 110%, rgba(0, 93, 251, 0.38), transparent 70%),
      linear-gradient(140deg, #041836 0%, #0a2350 58%, #0c2a5c 100%);
    position: relative;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(90deg, transparent 0%, #000 55%, #000 100%);
  }
  svg.net { position: absolute; right: 40px; top: 70px; opacity: 0.9; }
  .copy { position: absolute; left: 80px; top: 72px; right: 470px; display: flex; flex-direction: column; height: 486px; }
  .brand { display: flex; align-items: center; gap: 18px; }
  .brand img { width: 58px; height: auto; }
  .brand span { font-family: Manrope, Inter, sans-serif; font-weight: 800; font-size: 40px; letter-spacing: -0.03em; }
  h1 {
    margin-top: 64px;
    font-family: Manrope, Inter, sans-serif; font-weight: 800;
    font-size: 54px; line-height: 1.08; letter-spacing: -0.035em; color: #ffffff;
  }
  p.topics { margin-top: auto; white-space: nowrap; font-size: 21px; font-weight: 500; color: rgba(238, 244, 252, 0.74); letter-spacing: 0.005em; }
  .bar { position: absolute; left: 0; bottom: 0; width: 100%; height: 8px; background: linear-gradient(90deg, #005dfb, #0098f7 55%, #06c8f5); }
</style>
</head>
<body>
  <div class="grid"></div>
  <svg class="net" width="420" height="460" viewBox="0 0 420 460" fill="none">
    <g stroke="rgba(120, 190, 255, 0.35)" stroke-width="2">
      <line x1="210" y1="60" x2="110" y2="190"/><line x1="210" y1="60" x2="310" y2="190"/>
      <line x1="110" y1="190" x2="60" y2="330"/><line x1="110" y1="190" x2="170" y2="330"/>
      <line x1="310" y1="190" x2="250" y2="330"/><line x1="310" y1="190" x2="360" y2="330"/>
      <line x1="170" y1="330" x2="140" y2="420"/><line x1="170" y1="330" x2="200" y2="420"/>
    </g>
    <g>
      <circle cx="210" cy="60" r="22" fill="#06c8f5"/>
      <circle cx="110" cy="190" r="16" fill="#0098f7"/><circle cx="310" cy="190" r="16" fill="#0098f7"/>
      <circle cx="60" cy="330" r="11" fill="#005dfb"/><circle cx="170" cy="330" r="11" fill="#005dfb"/>
      <circle cx="250" cy="330" r="11" fill="#005dfb"/><circle cx="360" cy="330" r="11" fill="#005dfb"/>
      <circle cx="140" cy="420" r="9" fill="#0098f7"/><circle cx="200" cy="420" r="9" fill="#0098f7"/>
    </g>
  </svg>
  <div class="copy">
    <div class="brand">
      <img src="data:image/png;base64,${markBase64}" alt="">
      <span>${escapeHtml(SITE_NAME)}</span>
    </div>
    <h1>${escapeHtml(SOCIAL_CARD.headline[locale])}</h1>
    <p class="topics">${escapeHtml(SOCIAL_CARD.topics[locale])}</p>
  </div>
  <div class="bar"></div>
</body>
</html>`
  }
}
