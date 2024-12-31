// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
if (_show) {
  import('vconsole').then(({ default: VConsole }) => {
    const vConsole = new VConsole(options || {})
  })
}
