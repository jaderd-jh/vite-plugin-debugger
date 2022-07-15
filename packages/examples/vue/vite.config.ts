import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vDebugger } from 'vite-plugin-debugger'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vDebugger({
      debug: true,
      eruda: {
        options: {
          tool: ['console'],
        },
      },
    }),
  ],
})
