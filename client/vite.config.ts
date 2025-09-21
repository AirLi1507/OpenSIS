import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import unfont from "unplugin-fonts/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
        ]
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
            "/api": "https://test-2.hypernix.dev/api"
          }
          :
          undefined
      )
  }
})
