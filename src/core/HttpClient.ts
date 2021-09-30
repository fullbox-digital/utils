/* eslint-disable max-len */
import { Either } from '../railway/Either'

export type InputType = 'query' | 'body' | never

export type RequestParams<Data, DataName extends InputType> = Pick<Record<InputType, Data>, DataName> & {
  method: 'get' | 'delete' | 'post' | 'put'
  path: string
  header?: any
}

export interface Successful<T> {
  status: number
  data: T
}

export interface Unsuccessful<T> {
  status: number
  data?: T
}

export default interface HttpClient {
  request<SuccessfulResponse = any, UnsuccessfulResponse = any, InputData = unknown, DataName extends InputType | never = any>(
    params: RequestParams<InputData, DataName>
  ): Promise<Either<Unsuccessful<UnsuccessfulResponse>, Successful<SuccessfulResponse>>>
}
