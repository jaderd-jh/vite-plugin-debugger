import type { Eruda, InitOptions } from 'eruda'

declare const eruda: Eruda
declare let _show: boolean
declare const cdn: string
declare let options: InitOptions

if (_show) {
  const script = document.createElement('script')
  script.src = cdn
  script.async = true
  document.head.prepend(script)
  script.onload = () => {
    eruda.init(options || {})
  }
}
