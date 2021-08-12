import { ActionList } from './Action'
import { FindFieldData } from './FindFieldData';
import { NavigationList } from './Navigation';

export interface List<T, H, S = object> {
  header: H
  items: Array<ActionList<NavigationList<T>>>
  summary: { total: number } & S
  findFieldData?: FindFieldData[]
}
