import { ActionList } from './Action'

export interface List<T, S = object> {
  items: Array<ActionList<T>>
  summary: { total: number } & S
}
