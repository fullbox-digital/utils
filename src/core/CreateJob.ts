import { TenantDefault } from "..";

export interface CreateJob<T> {
  create(name: string, tenantId: string | TenantDefault, data: T): Promise<void>
}
