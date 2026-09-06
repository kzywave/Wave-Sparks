import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig(() => {

  const certificatePath = path.resolve('.cert/dev-cert.pem')
  const keyPath = path.resolve('.cert/dev-key.pem')
  const hasLocalCertificate = existsSync(certificatePath) && existsSync(keyPath)

  return {
    plugins: [react()],
    server: {
      host: true,
      ...(hasLocalCertificate
        ? {
            https: {
              cert: readFileSync(certificatePath),
              key: readFileSync(keyPath),
            },
          }
        : {}),
    },
    test: {
      environment: 'jsdom',
      environmentOptions: { jsdom: { url: 'http://localhost/' } },
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  }
})
