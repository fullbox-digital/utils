import { ResponseType } from './ResponseType'

export interface AlertBody {
  message: string
  type: ResponseType.WARNING
}
