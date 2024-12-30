import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'pnpm build && pnpm build:vue && pnpm preview:vue',
    port: 3333,
  },
}

export default config
