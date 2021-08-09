export interface Action {
  name: string
  path: string
  method: 'post' | 'put' | 'delete' | 'get' | 'navigation'
}

export type ActionList<T> = T & { actions: Action[] }
