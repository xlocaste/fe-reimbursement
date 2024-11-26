import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,png,jpg}'],
      },
      manifest: {
        name: 'Reimbursement',
        short_name: 'Reimbursement',
        description: 'Reimbursement PT Turbin Inovasi Indonesia',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
});
