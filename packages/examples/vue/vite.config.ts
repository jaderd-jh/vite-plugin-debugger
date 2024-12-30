import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { vDebugger } from 'vite-plugin-debugger/eruda'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vDebugger({
      debug: true,
      config: {
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
