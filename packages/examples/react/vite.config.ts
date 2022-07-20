import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vDebugger } from 'vite-plugin-debugger'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vDebugger({
      debug: false,
      active: {
        options: { priority: true },
        mode: 'url',
        param: 'debugwhatever',
      },
      eruda: {
        options: {
          tool: ['console', 'elements'],
          useShadowDom: true,
          autoScale: true,
          defaults: {
            displaySize: 50,
            transparency: 0.8,
            theme: 'Dark',
          },
        },
      },
    }),
  ],
})
