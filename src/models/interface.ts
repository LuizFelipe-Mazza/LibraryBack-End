export interface IRepository<T, D> {
  getById: (id: number) => Promise<T | undefined>
  update: (id: number, data: Partial<D>) => Promise<T>
  remove: (id: number) => Promise<void>
  paginate: (params: Pagination<Partial<T>>) => Promise<PaginateReturnType<T>>
  create: (data: D) => Promise<T | undefined>
}

export type Pagination<Filter> = {
  pageSize: number
  page?: number
  filter?: Filter | string | Object
}

export type PaginateReturnType<T> = {
  results: T[]
  total: number
  pageSize: number
  current: number
  lastPage: number
  filter?: string | Object
}