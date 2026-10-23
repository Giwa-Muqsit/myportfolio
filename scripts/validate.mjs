import { chromium } from 'playwright'
import { createServer } from 'vite'
import { mkdir } from 'node:fs/promises'

const server = await createServer({ server: { host: '127.0.0.1', port: 4173, strictPort: true } })
await server.listen()
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const errors = []

try {
  await mkdir('qa', { recursive: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  await page.locator('h1').waitFor()
  const images = page.locator('img')
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded()
  }
  await page.waitForFunction(() => Array.from(document.images).every(image => image.complete))
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: 'qa/desktop.png', fullPage: true })

  const bodyText = await page.locator('body').innerText()
  const requiredText = ['Pinnacle Tech Services', 'AI Automation', 'Abuja, Nigeria', '0805 601 9074', 'pinnacletechservices4@gmail.com', '2026 © Pinnacle Tech Services']
  for (const text of requiredText) {
    if (!bodyText.includes(text)) throw new Error(`Missing required content: ${text}`)
  }
  const projectCount = await page.locator('.website-link').count()
  if (projectCount !== 11) throw new Error(`Expected 11 project links, found ${projectCount}`)
  const brokenImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')))
  if (brokenImages.length) throw new Error(`Broken images: ${brokenImages.join(', ')}`)
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  if (desktopOverflow) throw new Error('Desktop horizontal overflow detected')

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload({ waitUntil: 'networkidle' })
  await page.locator('.menu-button').click()
  if (!(await page.locator('#mobile-navigation').isVisible())) throw new Error('Mobile navigation did not open')
  await page.locator('#mobile-navigation a[href="#about"]').click()
  if (await page.locator('#mobile-navigation').count()) throw new Error('Mobile navigation did not close')
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: 'qa/mobile.png', fullPage: true })
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  if (mobileOverflow) throw new Error('Mobile horizontal overflow detected')
  if (errors.length) throw new Error(`Browser errors: ${errors.join('; ')}`)

  console.log(JSON.stringify({ status: 'passed', projectCount, brokenImages, desktopOverflow, mobileOverflow, browserErrors: errors }, null, 2))
} finally {
  await browser.close()
  await server.close()
}
