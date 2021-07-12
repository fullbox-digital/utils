export interface Action {
  path: string
  method: 'post' | 'put' | 'delete' | 'get'
}

export type ActionList<T> = T & { actions: Action[] }
