import { Either } from '../railway/Either'

type InputType = 'query' | 'body' | never

type RequestParams<Data, DataName extends InputType> = Pick<Record<InputType, Data>, DataName> & {
  method: 'get' | 'delete' | 'post' | 'put'
  path: string
  header?: any
}

interface Successful<T> {
  status: number
  data: T
}

interface Unsuccessful<T> {
  status: number
  data?: T
}

export interface HttpClient {
  request<
    SuccessfulResponse = any,
    UnsuccessfulResponse = unknown,
    InputData = unknown,
    DataName extends InputType = any
  >(
    params: RequestParams<InputData, DataName>
  ): Promise<Either<Unsuccessful<UnsuccessfulResponse>, Successful<SuccessfulResponse>>>
}
