import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { vDebugger } from 'vite-plugin-debugger/vconsole'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vDebugger({
      debug: true,
      entry: resolve('src/main.tsx'),
      active: {
        mode: 'url',
        param: 'debugwhatever',
      },
      config: {
        options: {
          theme: 'dark',
        },
      },
    }),
  ],
})
