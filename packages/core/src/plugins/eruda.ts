import type { InitOptions } from 'eruda'
import type { CommonConfig, SharedConfig } from '../types'
import { isPackageExists } from 'local-pkg'
import { type HtmlTagDescriptor, normalizePath, type Plugin, type TransformResult } from 'vite'
import { readFileContent, transformCDN } from '../helpers'

export type { InitOptions }

interface ErudaConfig extends CommonConfig {
  /**
   * eruda options
   *
   * @see https://github.com/liriliri/eruda/blob/master/doc/API.md
   */
  options?: InitOptions
}

interface ErudaDebuggerOptions extends SharedConfig {
  /**
   * eruda config
   */
  config?: ErudaConfig
}

const transformErudaOptions = async (html: string, opts: ErudaDebuggerOptions) => {
  const { debug, active } = opts
  const { options, cdn = 'jsdelivr', src } = opts.config

  const tags: HtmlTagDescriptor[] = []

  let injectCodes = ``
  injectCodes += '\n(function(debug,active,options,cdn){\n'
  injectCodes += readFileContent('./precompiled/show-or-not.js')
  injectCodes += readFileContent('./precompiled/eruda/prepend-script.js')
  injectCodes += `\n})(${debug},${JSON.stringify(active)},${JSON.stringify(options)},${JSON.stringify(src || (await transformCDN('eruda', cdn)))});\n`

  tags.push({
    tag: 'script',
    injectTo: 'head',
    children: injectCodes,
  })

  if (debug !== undefined) {
    return {
      html,
      tags,
    }
  }
}

const transformErudaImport = (code: string, opts: ErudaDebuggerOptions): Promise<TransformResult> | TransformResult => {
  const { debug, active } = opts
  const { options = {} } = opts.config

  let injectCodes = ``
  injectCodes += '\n/* eslint-disable */\n'
  injectCodes += '\n(function(debug,active,options){\n'
  injectCodes += readFileContent('./precompiled/show-or-not.js')
  injectCodes += readFileContent('./precompiled/eruda/dynamic-import.js')
  injectCodes += `\n})(${debug},${JSON.stringify(active)},${JSON.stringify(options)});\n`
  injectCodes += '\n/* eslint-enable */\n'

  return {
    code: `${injectCodes}${code}`,
    map: null,
  }
}

export function vDebugger(options: ErudaDebuggerOptions): Plugin {
  const { local = isPackageExists('eruda'), entry } = options

  const entryPath = entry ? (Array.isArray(entry) ? entry : [entry]).map(path => normalizePath(path)) : []

  // use installed lib first
  if (local) {
    return {
      name: 'vite:mobile-devtools:eruda',
      transform(code: string, id: string): Promise<TransformResult> | TransformResult {
        if (entryPath.includes(id)) {
          return transformErudaImport(code, options)
        }

        return { code, map: null }
      },
    }
  }

  return {
    name: 'vite:mobile-devtools:eruda',
    transformIndexHtml: async (html: string) => {
      return await transformErudaOptions(html, options)
    },
  }
}

export default vDebugger
