// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
if (_show) {
  const script = document.createElement('script')
  script.src = cdn
  script.async = true
  document.head.prepend(script)
  script.onload = () => {
    const vConsole = new VConsole(options || {})
  }
}
