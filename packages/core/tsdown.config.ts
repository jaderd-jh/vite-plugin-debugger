import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['src/helpers/**/*.ts', '!src/helpers/index.ts'],
    outDir: 'dist/precompiled',
    platform: 'browser',
    target: 'es2015',
    dts: false,
    treeshake: false,
    minify: {
      compress: {
        unused: false,
      },
      mangle: {
        toplevel: false,
      },
    },
  },
  {
    entry: {
      eruda: 'src/plugins/eruda.ts',
      vconsole: 'src/plugins/vconsole.ts',
      index: 'src/index.ts',
    },
    target: 'esnext',
    clean: false,
    dts: true,
    platform: 'node',
    exports: true,
  },
])
