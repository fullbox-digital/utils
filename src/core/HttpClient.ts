import { Either } from '../railway/Either'

type Info = 'query' | 'body'

type RequestParams<Data, DataName extends Info> = Pick<Record<Info, Data>, DataName> & {
  method: 'get' | 'delete' | 'post' | 'put'
}

interface SuccessfulResponse<Data = unknown> {
  status: number
  data: Data
}

interface UnsuccessfulResponse {
  status: number
  data?: Array<{
    message?: string
  }>
}

export interface HttpClient {
  request<Response = any, Data = unknown, DataName extends Info | never = any>(
    params: RequestParams<Data, DataName>
  ): Promise<Either<UnsuccessfulResponse, SuccessfulResponse<Response>>>
}
