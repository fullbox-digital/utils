import { ActionList } from './Action'
import { NavigationList } from './Navigation';
import { FindFieldDataList } from './FindFieldData';

export interface List<T, H, S = object> {
  header: H
  items: Array<ActionList<NavigationList<FindFieldDataList<T>>>>
  summary: { total: number } & S
}
