import type { InitOptions } from 'eruda'
import type { HtmlTagDescriptor, IndexHtmlTransformResult, TransformResult } from 'vite'
import type { CommonOptions, DebuggerOptions } from '../index'
import { capitalize, transformCDN } from '../helpers'

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

export interface ErudaOptions extends CommonOptions {
  /**
   * eruda options
   * see also https://github.com/liriliri/eruda/blob/master/doc/API.md
   */
  options?: InitOptions
  /**
   * eruda plugins
   * see also https://github.com/liriliri/eruda#plugins
   */
  plugins?: ErudaPlugin[] | { name: ErudaPlugin; src: string }[]
}

export const transformErudaOptions = (html: string, opts: DebuggerOptions): IndexHtmlTransformResult => {
  const { debug } = opts
  const { options, plugins, cdn = 'jsdelivr', src } = opts.eruda

  const tags: HtmlTagDescriptor[] = []

  tags.push({
    tag: 'script',
    attrs: {
      src: src || transformCDN('eruda', cdn),
    },
    injectTo: 'head',
  })

  let erudaScript = `eruda.init(${JSON.stringify(options)});\n`

  if (plugins.length > 0) {
    if (cdn === 'jsdelivr') {
      tags.push({
        tag: 'script',
        attrs: {
          src: transformCDN(plugins.map(plugin => `eruda-${plugin}`)),
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
    children: erudaScript,
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

export const transformErudaImport = (
  code: string,
  opts: DebuggerOptions
): Promise<TransformResult> | TransformResult => {
  const { debug } = opts
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
    code: debug ? `/* eslint-disable */;${importCode}${erudaScript}/* eslint-enable */${code}` : code,
    map: null,
  }
}
