import type { VConsoleOptions } from 'core/options.interface'

declare let _show: boolean
declare let cdn: string
declare const VConsole: typeof import('vconsole').default
declare let options: VConsoleOptions

if (_show) {
  const script = document.createElement('script')
  script.src = cdn
  script.async = true
  document.head.prepend(script)
  script.onload = () => {
    const vConsole = new VConsole(options || {})
  }
}
