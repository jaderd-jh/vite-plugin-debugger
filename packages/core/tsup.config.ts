import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    eruda: 'src/plugins/eruda.ts',
    vconsole: 'src/plugins/vconsole.ts',
    index: 'src/index.ts',
  },
  target: 'esnext',
  clean: true,
  dts: true,
  format: ['esm'],
})
