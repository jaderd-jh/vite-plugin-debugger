import type { IndexHtmlTransformResult, Plugin, TransformResult } from 'vite'
import { normalizePath } from 'vite'
import {
  transformErudaImport,
  transformErudaOptions,
  transformVConsoleImport,
  transformVConsoleOptions,
} from './plugins'
import type { ActivateWayConfig, DebuggerOptions } from './types'

export const debugInit = (debug: boolean, activateWay: ActivateWayConfig) => {
  return `
    let showDebug=${debug};
    let storageStr = ''
    if(${activateWay?.way === 'url'}){
      let queryStr='';
      const result = (window.location.href || '').match(new RegExp('[\?\&]${
        activateWay?.param || 'debugwhatever'
      }=([^\&]+)', 'i'));
      if (Array.isArray(result) && result.length > 1) queryStr= result[1];
      if (queryStr === 'true') localStorage.setItem('${activateWay?.param || 'debugwhatever'}', 'true');
    }
    if(${activateWay?.way === 'url' || activateWay?.way === 'storage'})
      storageStr = localStorage.getItem('${activateWay?.param || 'debugwhatever'}')
    if (storageStr === 'true'){ showDebug=true };
  `
}

export const vDebugger = (options: DebuggerOptions): Plugin => {
  const { eruda, vConsole, local, entry } = options

  const entryPath = entry ? (Array.isArray(entry) ? entry : [entry]).map(path => normalizePath(path)) : []

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

export default vDebugger
