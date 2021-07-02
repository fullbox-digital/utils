export abstract class Controller<Req, Res> {
  abstract handle (request: Req): Promise<Res>
}
