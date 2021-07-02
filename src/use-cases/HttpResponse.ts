export interface HttpResponse<T> {
  status: number
  body?: T
}
