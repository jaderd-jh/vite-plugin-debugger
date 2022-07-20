# vite-plugin-debugger

一个提供移动端debug工具的vite插件

<a href="https://npmjs.com/package/vite-plugin-debugger" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/vite-plugin-debugger.svg" />
</a><a href="https://www.npmjs.com/package/vite-plugin-debugger">
  <img src="https://badgen.net/npm/v/vite-plugin-debugger" alt="">
</a><a href="https://github.com/jaderd-jh/vite-plugin-debugger" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/jaderd-jh/vite-plugin-debugger.svg?style=social&label=Star" />
</a>

**English** | [中文](./README.zh_CN.md)

## 安装

**node 版本:** >=14.0.0

**vite 版本:** >=2.0.0

```bash
pnpm add vite-plugin-debugger -D
# or
yarn add vite-plugin-debugger -D
# or
npm i vite-plugin-debugger -D
```

## 使用

### For [eruda](https://github.com/liriliri/eruda)

由于eruda的未打包大小有2.38MB,所以我们推荐默认使用CDN方式引入

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

使用active工具强制开启eruda，您可以像这样指定激活方法和参数名：

    active: {
       options: { priority: true }
       mode: 'url', 
       param: 'debugwhatever',
    }
⚠ cdnjs 不提供与 eruda 相关的插件，因此您可以像这样指定每个插件的 CDN 源:

```
        plugins: [
          {
            name: 'fps',
            src: 'https://cdn.jsdelivr.net/npm/eruda-fps',
          },
       // ...
        ],
```

想了解更多有关eruda配置，请移至 [eruda API](https://github.com/liriliri/eruda/blob/master/doc/API.md).

如果您偏好于在本地使用eruda,您应该先安装reuda及其插件。

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

由于vConsole的未打包大小有344kb,所以我们推荐默认使用CDN方式引入

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

使用active配置动态开启vConsole，您可以像这样指定激活方法和参数名：

    active: { mode: 'url', param: 'debugwhatever' },

想了解更多有关vConsole配置，请移至 [vConsole API](https://github.com/Tencent/vConsole/blob/dev/doc/public_properties_methods.md).

如果您偏好于在本地使用vConsole,您应该先安装vConsole及其插件。

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
