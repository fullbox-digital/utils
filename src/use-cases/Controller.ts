export interface Controller<Req, Res> {
  handle: (request: Req) => Promise<Res>
}
