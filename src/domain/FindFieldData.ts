interface FindFieldData {
  field: string
  path: string
  query: object
}

export type FindFieldDataList<T> = T & { fiendFieldData?: FindFieldData[] }