import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { vDebugger } from 'vite-plugin-debugger/vconsole'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vDebugger({
      debug: true,
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
