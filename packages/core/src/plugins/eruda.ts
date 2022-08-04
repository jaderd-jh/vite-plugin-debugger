import type { InitOptions } from 'eruda'
import type { HtmlTagDescriptor, IndexHtmlTransformResult, TransformResult } from 'vite'
import { capitalize, debugInit, transformCDN } from '../helpers'
import type { CommonConfig, DebuggerOptions } from '../types'

export type ErudaPlugin =
  | 'fps'
  | 'features'
  | 'timing'
  | 'memory'
  | 'code'
  | 'benchmark'
  | 'geolocation'
  | 'dom'
  | 'orientation'
  | 'touches'

export interface ErudaConfig extends CommonConfig {
  /**
   * eruda options
   *
   * see also https://github.com/liriliri/eruda/blob/master/doc/API.md
   */
  options?: InitOptions
  /**
   * eruda plugins
   *
   * see also https://github.com/liriliri/eruda#plugins
   */
  plugins?: ErudaPlugin[] | { name: ErudaPlugin; src: string }[]
}

export const transformErudaOptions = (html: string, opts: DebuggerOptions): IndexHtmlTransformResult => {
  const { debug, active } = opts
  const { options, plugins, cdn = 'jsdelivr', src } = opts.eruda

  const tags: HtmlTagDescriptor[] = []

  tags.push({
    tag: 'script',
    attrs: {
      src: src || transformCDN('eruda', cdn),
    },
    injectTo: 'head',
  })

  let erudaScript = `eruda.init(${JSON.stringify(options || {})});`

  if (plugins && plugins.length > 0) {
    if (cdn === 'jsdelivr') {
      tags.push({
        tag: 'script',
        attrs: {
          src: transformCDN(
            plugins.map(plugin => `eruda-${plugin}`),
            cdn
          ),
        },
        injectTo: 'head',
      })
    } else {
      plugins.forEach(plugin => {
        tags.push({
          tag: 'script',
          attrs: {
            src: typeof plugin === 'string' ? transformCDN(`eruda-${plugin}`, cdn) : plugin.src,
          },
          injectTo: 'head',
        })
      })
    }

    plugins.forEach(plugin => {
      erudaScript += `eruda.add(eruda${capitalize(typeof plugin === 'string' ? plugin : plugin.name)});\n`
    })
  }

  tags.push({
    tag: 'script',
    children: `${debugInit(debug, active)}\n if(showDebug===true){ ${erudaScript}}`,
    injectTo: 'head',
  })

  if (debug !== undefined) {
    return {
      html,
      tags,
    }
  }

  if (!import.meta.env.PROD) {
    return {
      html,
      tags,
    }
  }
}

export const transformErudaImport = (
  code: string,
  opts: DebuggerOptions
): Promise<TransformResult> | TransformResult => {
  const { debug, active } = opts
  const { options = {}, plugins } = opts.eruda

  let importCode = "import eruda from 'eruda';"
  let erudaScript = `eruda.init(${JSON.stringify(options)});`

  if (plugins && plugins.length > 0) {
    plugins.forEach(plugin => {
      importCode += `import eruda${capitalize(typeof plugin === 'string' ? plugin : plugin.name)} from 'eruda-${
        typeof plugin === 'string' ? plugin : plugin.name
      }';`
      erudaScript += `eruda.add(eruda${capitalize(typeof plugin === 'string' ? plugin : plugin.name)});`
    })
  }

  return {
    code: `/* eslint-disable */;\n${importCode}\n ${debugInit(
      debug,
      active
    )}if(showDebug===true){${erudaScript}}\n/* eslint-enable */\n${code}`,
    map: null,
  }
}
