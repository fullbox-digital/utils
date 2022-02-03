import { TenantDefault } from '..'

export interface CreateJobOptions {
  delay?: number
}

export interface CreateJob<T> {
  create(
    name: string,
    tenantId: string | TenantDefault,
    data: T,
    options?: CreateJobOptions
  ): Promise<void>
}
