import { ActionList } from './Action'

export interface List<T, H, S = object> {
  header: H
  items: Array<ActionList<T>>
  summary: { total: number } & S
}
