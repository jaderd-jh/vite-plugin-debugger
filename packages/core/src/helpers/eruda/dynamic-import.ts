// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
if (_show) {
  import('eruda').then(({ default: eruda }) => {
    eruda.init(options || {})
  })
}
