import { Either } from '../railway/Either'

type InputType = 'query' | 'body' | never

type RequestParams<Data, DataName extends InputType> = Pick<Record<InputType, Data>, DataName> & {
  method: 'get' | 'delete' | 'post' | 'put'
  path: string
}

interface SuccessfulResponse<T> {
  status: number
  data: T
}

interface UnsuccessfulResponse<T> {
  status: number
  data?: T
}

export interface HttpClient {
  request<
    Response = any,
    SuccessfulData = unknown,
    UnsuccessfulData = unknown,
    DataName extends InputType = any
  >(
    params: RequestParams<SuccessfulData, DataName>
  ): Promise<Either<UnsuccessfulResponse<UnsuccessfulData>, SuccessfulResponse<Response>>>
}
