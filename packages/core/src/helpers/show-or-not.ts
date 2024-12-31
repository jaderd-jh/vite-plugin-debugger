// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
let _show = false
let storageStr = ''
if (active?.mode === 'url') {
  let queryStr = ''
  const result = window.location.href.match(new RegExp(`[?&]${active.param}=([^&]+)`, 'i'))
  if (Array.isArray(result) && result.length > 1) queryStr = result[1]
  if (queryStr) sessionStorage.setItem(active.param, queryStr)
}
if (active?.mode === 'url' || active?.mode === 'storage') {
  storageStr = sessionStorage.getItem(active.param)
}
if (active) {
  if (active.override) {
    if (storageStr) {
      _show = true
    }
  } else {
    if (debug && storageStr) {
      _show = true
    }
  }
} else {
  _show = debug
}
