import { describe, expect, it } from 'vitest'
import manifestSource from '../public/manifest.json?raw'

describe('PWA shell', () => {
  it('declares a standalone manifest with generic raster icons', () => {
    const manifest = JSON.parse(manifestSource)
    expect(manifest.name).toBe('Product Initiatives')
    expect(manifest.display).toBe('standalone')
    expect(manifest.start_url).toBe('/')
    expect(manifest.background_color).toBe('#f5f6f8')
    expect(manifest.theme_color).toBe('#ffe512')
    expect(manifest).not.toHaveProperty('orientation')
    expect(manifest.icons).toEqual([
      expect.objectContaining({ src: '/icons/pwa-192x192.png', sizes: '192x192', purpose: 'any maskable' }),
      expect.objectContaining({ src: '/icons/pwa-512x512.png', sizes: '512x512', purpose: 'any maskable' }),
    ])
  })
})
