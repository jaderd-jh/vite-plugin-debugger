import type { VConsoleOptions } from 'core/options.interface'

declare let _show: boolean
declare let options: VConsoleOptions

if (_show) {
  import('vconsole').then(({ default: VConsole }) => {
    const vConsole = new VConsole(options || {})
  })
}
