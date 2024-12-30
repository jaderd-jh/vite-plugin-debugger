export type CDN = 'jsdelivr' | 'unpkg' | 'cdnjs'

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

export interface ActiveConfig {
  /**
   * define is active override debug
   */
  override?: boolean
  /**
   * use url or storage
   */
  mode: 'url' | 'storage'
  /**
   * parameter name
   */
  param: string
}

export interface SharedConfig {
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
}
