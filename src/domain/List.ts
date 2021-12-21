import { ActionList } from './Action'
import { FindFieldData } from './FindFieldData'
import { NavigationList } from './Navigation'

export interface List<T, H> {
  header: H
  items: Array<ActionList<NavigationList<T>>>
  summary: {
    total: number
    items?: Array<{
      label: string
      value: string
    }>
  }
  findFieldData?: FindFieldData[]
}
