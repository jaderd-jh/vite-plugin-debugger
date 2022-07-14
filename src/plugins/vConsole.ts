/// <reference path="../../node_modules/vconsole/dist/vconsole.min.d.ts" />

import type { HtmlTagDescriptor, IndexHtmlTransformResult, TransformResult } from 'vite'
import type { VConsoleOptions } from 'core/options.interface'
import { transformCDN } from '../helpers'
import type { CommonConfig, DebuggerOptions } from '../types'
import { debugInit } from '../index'

export interface VConsoleConfig extends CommonConfig {
  /**
   * vConsole options
   *
   * see also https://github.com/Tencent/vConsole/blob/dev/doc/public_properties_methods.md#vconsoleoption
   */
  options?: VConsoleOptions
}

export const transformVConsoleOptions = (html: string, opts: DebuggerOptions): IndexHtmlTransformResult => {
  const { debug, activateWay } = opts
  const { options, cdn = 'jsdelivr', src } = opts.vConsole
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
    children: `${debugInit(debug, activateWay)}\n if(showDebug===true){var vConsole = new VConsole(${JSON.stringify(
      options || {}
    )})};`,
    injectTo: 'head',
  })

  if (debug === true || debug === false) {
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
  opts: DebuggerOptions
): Promise<TransformResult> | TransformResult => {
  const { debug, activateWay } = opts
  const { options = {} } = opts.vConsole
  return {
    code: `/* eslint-disable */;import VConsole from 'vconsole'; ${debugInit(
      debug,
      activateWay
    )}\n if(showDebug===true){new VConsole(${JSON.stringify(options)})};/* eslint-enable */${code}`,
    map: null,
  }
}
