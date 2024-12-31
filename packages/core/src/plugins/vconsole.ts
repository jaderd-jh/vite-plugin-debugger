/// <reference path="../../../../node_modules/vconsole/dist/vconsole.min.d.ts" />

import type { VConsoleOptions } from 'core/options.interface'
import type { CommonConfig, SharedConfig } from '../types'
import { isPackageExists } from 'local-pkg'
import { type HtmlTagDescriptor, normalizePath, type Plugin, type TransformResult } from 'vite'
import { readFileContent, transformCDN } from '../helpers'

export type { VConsoleOptions }

interface VConsoleConfig extends CommonConfig {
  /**
   * vConsole options
   *
   * @see https://github.com/Tencent/vConsole/blob/dev/doc/public_properties_methods.md#vconsoleoption
   */
  options?: VConsoleOptions
}

interface VConsoleDebuggerOptions extends SharedConfig {
  /**
   * vConsole config
   */
  config?: VConsoleConfig
}

const transformVConsoleOptions = async (html: string, opts: VConsoleDebuggerOptions) => {
  const { debug, active } = opts
  const { options, cdn = 'jsdelivr', src } = opts.config
  const tags: HtmlTagDescriptor[] = []

  let injectCodes = ``
  injectCodes += '\n(function(debug,active,options,cdn){\n'
  injectCodes += readFileContent('./precompiled/show-or-not.js')
  injectCodes += readFileContent('./precompiled/vconsole/prepend-script.js')
  injectCodes += `\n})(${debug},${JSON.stringify(active)},${JSON.stringify(options)},${JSON.stringify(src || (await transformCDN('vConsole', cdn)))});\n`

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

const transformVConsoleImport = (
  code: string,
  opts: VConsoleDebuggerOptions
): Promise<TransformResult> | TransformResult => {
  const { debug, active } = opts
  const { options = {} } = opts.config

  let injectCodes = ``
  injectCodes += '\n/* eslint-disable */\n'
  injectCodes += '\n(function(debug,active,options){\n'
  injectCodes += readFileContent('./precompiled/show-or-not.js')
  injectCodes += readFileContent('./precompiled/vconsole/dynamic-import.js')
  injectCodes += `\n})(${debug},${JSON.stringify(active)},${JSON.stringify(options)});\n`
  injectCodes += '\n/* eslint-enable */\n'

  return {
    code: `${injectCodes}${code}`,
    map: null,
  }
}

export function vDebugger(options: VConsoleDebuggerOptions): Plugin {
  const { local = isPackageExists('vconsole'), entry } = options

  const entryPath = entry ? (Array.isArray(entry) ? entry : [entry]).map(path => normalizePath(path)) : []

  // use installed lib first
  if (local) {
    return {
      name: 'vite:mobile-devtools:vconsole',
      transform(code: string, id: string): Promise<TransformResult> | TransformResult {
        if (entryPath.includes(id)) {
          return transformVConsoleImport(code, options)
        }

        return { code, map: null }
      },
    }
  }

  return {
    name: 'vite:mobile-devtools:vconsole',
    transformIndexHtml: async (html: string) => {
      return await transformVConsoleOptions(html, options)
    },
  }
}

export default vDebugger
