export interface UnitOfWork {
  startWork(): Promise<void>
  finishWork(): Promise<void>
  cancelWork(): Promise<void>
}
