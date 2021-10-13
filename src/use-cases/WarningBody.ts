import { ResponseType } from './ResponseType'

export interface WarningBody {
  message: string
  type: ResponseType.WARNING
}
