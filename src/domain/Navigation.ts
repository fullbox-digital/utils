export interface Navigation {
  field: string
  path: string
}

export type NavigationList<T> = T & { navigations: Navigation[] }