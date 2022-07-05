import type { IndexHtmlTransformResult, Plugin, TransformResult } from 'vite'
import slash from 'slash'
import type { ErudaOptions, vConsoleOptions } from './plugins'
import {
  transformErudaImport,
  transformErudaOptions,
  transformVConsoleImport,
  transformVConsoleOptions,
} from './plugins'
import type { CDN } from './helpers'

export interface CommonOptions {
  /**
   * cdn services
   */
  cdn?: CDN
  /**
   * custom cdn url
   */
  src?: string
}

export interface DebuggerOptions {
  /**
   * debug or not
   */
  debug?: boolean
  /**
   * use node_modules
   */
  local?: boolean
  /**
   * if local is true, use this to specify the path
   */
  entry?: string | string[]
  /**
   * eruda options
   */
  eruda?: ErudaOptions
  /**
   * vConsole options
   */
  vConsole?: vConsoleOptions
}

export default (options: DebuggerOptions): Plugin => {
  const { eruda, vConsole, local, entry } = options

  const entryPath = entry ? (Array.isArray(entry) ? entry : [entry]).map(path => slash(path)) : []

  if (eruda && vConsole) {
    throw new Error("[vite-plugin-debugger]: You'd better use only one debugger tool at a time.")
  }

  return {
    name: 'vite-plugin-debugger',
    transformIndexHtml(html: string): IndexHtmlTransformResult {
      if (!local) {
        if (eruda) {
          return transformErudaOptions(html, options)
        }
        if (vConsole) {
          return transformVConsoleOptions(html, options)
        }
      }

      return html
    },
    transform(code: string, id: string): Promise<TransformResult> | TransformResult {
      if (local) {
        if (eruda && entryPath.includes(id)) {
          return transformErudaImport(code, options)
        }
        if (vConsole && entryPath.includes(id)) {
          return transformVConsoleImport(code, options)
        }
      }

      return { code, map: null }
    },
  }
}
