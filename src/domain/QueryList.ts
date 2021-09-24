export interface QueryList<I, D = unknown> {
  items: I[]
  summary: D & {
    total: number
  }
}
