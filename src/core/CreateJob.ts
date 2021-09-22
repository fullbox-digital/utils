export interface CreateJob<T> {
  create(name: string, tenantId: string, data: T): Promise<void>
}
