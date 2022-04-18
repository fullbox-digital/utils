import { TenantDefault } from '..'

export interface CreateJobOptions {
  delay?: number
  repeat?: {
    cron?: string
  }
}

export interface JobData<T> {
  name: string
  tenantId: string | TenantDefault
  data: T
  options?: CreateJobOptions
}

export interface CreateJob<T> {
  create(
    name: string,
    tenantId: string | TenantDefault,
    data: T,
    options?: CreateJobOptions
  ): Promise<void>

  createBulk(bulk: Array<JobData<T>>): Promise<void>
}
