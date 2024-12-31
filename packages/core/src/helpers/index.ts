import type { CDN } from '../types'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const transformCDN = async (pkg: string, cdn?: CDN) => {
  if (cdn === 'jsdelivr') {
    return `https://cdn.jsdelivr.net/npm/${pkg.toLowerCase()}`
  }

  if (cdn === 'unpkg') {
    return `https://unpkg.com/${pkg}`
  }

  if (cdn === 'cdnjs') {
    const libInfo = await fetch(`https://api.cdnjs.com/libraries/${pkg}?fields=version`).then(
      res => res.json() as Promise<{ version: string }>
    )
    const { version } = libInfo
    return `https://cdnjs.cloudflare.com/ajax/libs/${pkg}/${version}/${pkg.toLowerCase()}.min.js`
  }

  if (cdn === 'staticfile') {
    const libInfo = await fetch(`https://api.staticfile.bet/libraries/${pkg}`).then(
      res => res.json() as Promise<{ version: string; filename: string }>
    )
    const { version, filename } = libInfo
    return `https://cdn.staticfile.net/${pkg}/${version}/${filename}`
  }

  return ''
}

export const readFileContent = (path: string) => {
  return readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf-8')
}
