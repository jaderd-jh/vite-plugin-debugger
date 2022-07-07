# vite-plugin-debugger

A vite plugin provide the debugger tools for mobile devices.

<a href="https://npmjs.com/package/vite-plugin-debugger" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/vite-plugin-debugger.svg" />
</a><a href="https://www.npmjs.com/package/vite-plugin-debugger">
  <img src="https://badgen.net/npm/v/vite-plugin-debugger" alt="">
</a><a href="https://github.com/jaderd-jh/vite-plugin-debugger" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/jaderd-jh/vite-plugin-debugger.svg?style=social&label=Star" />
</a>

**English** | [中文](./README.zh_CN.md)

## Install

**node version:** >=14.0.0

**vite version:** >=2.0.0

```bash
pnpm add vite-plugin-debugger -D
# or
yarn add vite-plugin-debugger -D
# or
npm i vite-plugin-debugger -D
```

## Usage

### For [eruda](https://github.com/liriliri/eruda)

we use eruda with CDN by default since it's unpacked size is 2.38 MB.

```typescript
import { fileURLToPath } from 'url'
import vDebugger from 'vite-plugin-debugger'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vDebugger({
      debug: mode !== 'production',
      eruda: {
        // cdn: 'jsdelivr', // 'jsdelivr' | 'unpkg' | 'cdnjs'
        // src: 'custom CDN URL', 
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
        plugins: [
          'fps',
          'features',
          'timing',
          'memory',
          'code',
          'benchmark',
          'dom',
          'orientation',
          'touches',
          // 'geolocation',
        ],
      },
    })
  ]
}))
```

⚠ cdnjs don't provide eruda related plugins so you can specify every plugin's CDN source like:

```
        plugins: [
          {
            name: 'fps',
            src: 'https://cdn.jsdelivr.net/npm/eruda-fps',
          },
       // ...
        ],
```

For more details about eruda options, please check
out [eruda API](https://github.com/liriliri/eruda/blob/master/doc/API.md).

If you prefer use eruda locally, you should install eruda and it's plugins first.

```bash
pnpm add eruda -D
# or
yarn add eruda -D
# or
npm i eruda -D

# And some optional plugins
pnpm[yarn|npm] add eruda-fps eruda-features eruda-timing eruda-memory eruda-code eruda-benchmark eruda-dom eruda-orientation eruda-touches eruda-geolocation -D
```

```typescript
import { fileURLToPath } from 'url'
import vDebugger from 'vite-plugin-debugger'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vDebugger({
      debug: mode !== 'production',
      local: true,
      entry: resolve('src/main.ts'),// vue or src/main.tsx for react
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
        plugins: [
          'fps',
          'features',
          'timing',
          'memory',
          'code',
          'benchmark',
          'dom',
          'orientation',
          'touches',
          // 'geolocation',
        ],
      }
    })
  ]
}))
```

### For [vConsole](https://github.com/Tencent/vConsole)

we use vConsole with CDN by default since it's unpacked size is 344 kB.

```typescript
import { fileURLToPath } from 'url'
import vDebugger from 'vite-plugin-debugger'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vDebugger({
      debug: mode !== 'production',
      vConsole: {
        options: {
          theme: 'dark',
        },
      },
    })
  ]
}))
```

For more details about vConsole options, please check
out [vConsole API](https://github.com/Tencent/vConsole/blob/dev/doc/public_properties_methods.md).

If you prefer use vConsole locally, you should install vConsole first.

```bash
pnpm add vconsole -D
# or
yarn add vconsole -D
# or
npm i vconsole -D
```

```typescript
import { fileURLToPath } from 'url'
import vDebugger from 'vite-plugin-debugger'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vDebugger({
      debug: mode !== 'production',
      local: true,
      entry: resolve('src/main.ts'),// vue or src/main.tsx for react
      vConsole: {
        options: {
          theme: 'dark',
        },
      },
    })
  ]
}))
```

## License

[MIT](LICENSE)
