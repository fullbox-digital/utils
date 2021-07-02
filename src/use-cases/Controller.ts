import { HttpResponse } from './HttpResponse'

export abstract class Controller<Request, Response> {
  abstract handle: (request: Request) => Promise<HttpResponse<Response>>
}
