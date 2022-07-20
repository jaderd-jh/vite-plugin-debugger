import type { CDN } from '../helpers'
import type { ErudaConfig, VConsoleConfig } from '../plugins'

export interface CommonConfig {
  /**
   * cdn services
   */
  cdn?: CDN
  /**
   * custom cdn url
   */
  src?: string
}

export interface ActiveOptions {
  /**
   * priority between debug and active
   */
  priority: boolean
}

export interface ActiveConfig {
  /**
   * active options
   */
  options?: ActiveOptions
  /**
   * use url or storage
   */
  mode: 'url' | 'storage'
  /**
   * parameter name
   */
  param: string
}
export interface DebuggerOptions {
  /**
   * debug or not
   */
  debug?: boolean
  /**
   * active debugger
   */
  active?: ActiveConfig
  /**
   * use node_modules
   */
  local?: boolean
  /**
   * if local is true, use this to specify the path
   */
  entry?: string | string[]
  /**
   * eruda config
   */
  eruda?: ErudaConfig
  /**
   * vConsole config
   */
  vConsole?: VConsoleConfig
}
