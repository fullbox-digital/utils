/* eslint-disable max-len */
import { Either } from '../railway/Either'
import https from 'https'

export type RequestParams<Data, DataName extends 'query' | 'body'> = Pick<Record<'query' | 'body', Data>, DataName> & {
  method: 'get' | 'delete' | 'post' | 'put' | 'patch'
  path: string
  header?: any
  responseType?: 'arraybuffer'| 'blob'| 'document'| 'json'| 'text'| 'stream'
  httpsAgent?: https.Agent
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
  request<SuccessfulResponse = any, UnsuccessfulResponse = any, InputData = unknown, DataName extends 'query' | 'body' | never = any>(
    params: RequestParams<InputData, DataName>
  ): Promise<Either<Unsuccessful<UnsuccessfulResponse>, Successful<SuccessfulResponse>>>
}
