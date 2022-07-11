export type CDN = 'jsdelivr' | 'unpkg' | 'cdnjs'

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const transformCDN = (pkg: string | string[], cdn?: CDN) => {
  if (cdn === 'jsdelivr') {
    if (Array.isArray(pkg)) {
      return `https://cdn.jsdelivr.net/combine/${pkg.map(p => `npm/${p}`).join(',')}`
    }
    return `https://cdn.jsdelivr.net/npm/${pkg}`
  }

  if (cdn === 'unpkg') {
    return `https://unpkg.com/${pkg}`
  }

  if (cdn === 'cdnjs') {
    if (!Array.isArray(pkg)) {
      if (pkg === 'eruda') {
        return 'https://cdnjs.cloudflare.com/ajax/libs/eruda/2.5.0/eruda.min.js'
      }
      throw new Error(`[vite-plugin-debugger]: ${cdn} only support eruda without its plugins.`)
    }
    return `https://cdnjs.cloudflare.com/ajax/libs/${pkg}`
  }

  return ''
}
