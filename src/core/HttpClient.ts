/* eslint-disable max-len */
import { Either } from '../railway/Either'
import https from 'https'

export type RequestParams<Data, DataName extends 'query' | 'body' | 'form', H = any, Options = any> = Pick<Record<'query' | 'body' | 'form', Data>, DataName> & {
  method: 'get' | 'delete' | 'post' | 'put' | 'patch'
  path: string
  header?: H
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
  httpsAgent?: https.Agent
  options?: Options
}

export interface Successful<D, H = any> {
  status: number
  data: D
  headers?: H
}

export interface Unsuccessful<D, H = any> {
  status: number
  data?: D
  headers?: H
}

export interface HttpClient {
  request<SuccessfulResponse = any, UnsuccessfulResponse = any, InputData = unknown, DataName extends 'query' | 'body' | 'form' | never = any, H = any, Options = any>(
    params: RequestParams<InputData, DataName, H, Options>
  ): Promise<Either<Unsuccessful<UnsuccessfulResponse>, Successful<SuccessfulResponse>>>
}
