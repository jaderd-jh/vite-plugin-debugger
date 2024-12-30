/// <reference path="../../../../node_modules/vconsole/dist/vconsole.min.d.ts" />

import type { VConsoleOptions } from 'core/options.interface'
import type { CommonConfig, SharedConfig } from '../types'
import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import {
  type HtmlTagDescriptor,
  type IndexHtmlTransformResult,
  normalizePath,
  type Plugin,
  type TransformResult,
} from 'vite'
import { debugInit, transformCDN } from '../helpers'

export interface VConsoleConfig extends CommonConfig {
  /**
   * vConsole options
   *
   * @see https://github.com/Tencent/vConsole/blob/dev/doc/public_properties_methods.md#vconsoleoption
   */
  options?: VConsoleOptions
}

export interface VConsoleDebuggerOptions extends SharedConfig {
  /**
   * vConsole config
   */
  config?: VConsoleConfig
}

export const transformVConsoleOptions = (html: string, opts: VConsoleDebuggerOptions): IndexHtmlTransformResult => {
  const { debug, active } = opts
  const { options, cdn = 'jsdelivr', src } = opts.config
  const tags: HtmlTagDescriptor[] = []

  tags.push({
    tag: 'script',
    attrs: {
      src: src || transformCDN('vconsole', cdn),
    },
    injectTo: 'head',
  })

  tags.push({
    tag: 'script',
    children: `${debugInit(debug, active)}\n if(showDebug===true){var vConsole = new VConsole(${JSON.stringify(
      options || {}
    )})};`,
    injectTo: 'head',
  })

  if (debug !== undefined) {
    return {
      html,
      tags,
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return {
      html,
      tags,
    }
  }
}

export const transformVConsoleImport = (
  code: string,
  opts: VConsoleDebuggerOptions
): Promise<TransformResult> | TransformResult => {
  const { debug, active } = opts
  const { options = {} } = opts.config
  return {
    code: `/* eslint-disable */;import VConsole from 'vconsole'; ${debugInit(
      debug,
      active
    )}\n if(showDebug===true){new VConsole(${JSON.stringify(options)})};/* eslint-enable */${code}`,
    map: null,
  }
}

export const vDebugger = (options: VConsoleDebuggerOptions): Plugin => {
  const { local = isPackageExists('vconsole'), entry } = options

  const entryPath = entry ? (Array.isArray(entry) ? entry : [entry]).map(path => normalizePath(path)) : []

  // use installed lib first
  if (local) {
    return {
      name: 'vite-plugin-debugger',
      transform(code: string, id: string): Promise<TransformResult> | TransformResult {
        if (entryPath.includes(id)) {
          return transformVConsoleImport(code, options)
        }

        return { code, map: null }
      },
    }
  }

  return {
    name: 'vite-plugin-debugger',
    transformIndexHtml(html: string): IndexHtmlTransformResult {
      return transformVConsoleOptions(html, options)
    },
  }
}
