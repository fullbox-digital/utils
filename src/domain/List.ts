import { ActionList } from './Action'

export interface List<T, S = never> {
  items: Array<ActionList<T>>
  summary: S & { total: number }
}
