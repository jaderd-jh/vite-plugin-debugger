import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      'show-or-not': 'src/helpers/show-or-not.ts',
      'eruda/prepend-script': 'src/helpers/eruda/prepend-script.ts',
      'eruda/dynamic-import': 'src/helpers/eruda/dynamic-import.ts',
      'vconsole/prepend-script': 'src/helpers/vconsole/prepend-script.ts',
      'vconsole/dynamic-import': 'src/helpers/vconsole/dynamic-import.ts',
    },
    outDir: 'src/precompiled',
    target: 'es5',
    format: ['esm'],
    clean: true,
    dts: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        unused: false,
      },
      mangle: {
        reserved: ['_show'],
      },
    },
  },
])
