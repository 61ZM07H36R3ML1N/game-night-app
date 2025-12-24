import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Game Night Hub',
        short_name: 'GameNight',
        description: 'Vote on food and games for game night!',
        theme_color: '#1e293b', // Matches your slate-900 background
        background_color: '#1e293b',
        display: 'standalone', // This hides the browser URL bar
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png', // We will create this placeholder next
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})