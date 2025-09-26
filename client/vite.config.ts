import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import unfont from "unplugin-fonts/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        comments: false,
        minified: true
      }
    }),
    tailwindcss(),
    unfont({
      google: {
        families: [
          {
            name: "Ubuntu",
            defer: true
          },
          {
            name: "Noto Sans TC",
            defer: true
          }
        ],
        preconnect: true
      }
    })
  ],
  server: {
    allowedHosts: true,
    proxy:
      (
        process.env.NODE_ENV !== "production"
          ?
          {
            "/api/v1": "https://test-3.hypernix.dev"
          }
          :
          undefined
      )
  },
  build: {
    target: "esnext",
    cssMinify: "esbuild",
    minify: "oxc",
    emptyOutDir: true
  }
})
