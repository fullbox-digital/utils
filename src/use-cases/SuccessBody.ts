import { ResponseType } from './ResponseType'

export interface SuccessBody {
  message: string
  type: ResponseType.SUCCESS
}
