/// <reference path="../../node_modules/vconsole/dist/vconsole.min.d.ts" />

import type { HtmlTagDescriptor, IndexHtmlTransformResult, TransformResult } from 'vite'
import type { VConsoleOptions } from 'core/options.interface'
import type { CommonOptions, DebuggerOptions } from '../index'
import { transformCDN } from '../helpers'

export interface vConsoleOptions extends CommonOptions {
  options?: VConsoleOptions
}

export const transformVConsoleOptions = (html: string, opts: DebuggerOptions): IndexHtmlTransformResult => {
  const { debug } = opts
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
    children: `var vConsole = new VConsole(${JSON.stringify(options)});`,
    injectTo: 'head',
  })

  if (debug === true) {
    return {
      html,
      tags,
    }
  }

  if (debug === false) {
    return html
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
  const { debug } = opts
  const { options = {} } = opts.vConsole
  return {
    code: debug
      ? `/* eslint-disable */;import VConsole from 'vconsole';new VConsole(${JSON.stringify(
          options
        )});/* eslint-enable */${code}`
      : code,
    map: null,
  }
}