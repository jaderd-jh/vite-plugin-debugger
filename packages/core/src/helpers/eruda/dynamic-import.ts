import type { InitOptions } from 'eruda'

declare let _show: boolean
declare let options: InitOptions

if (_show) {
  import('eruda').then(({ default: eruda }) => {
    eruda.init(options || {})
  })
}
