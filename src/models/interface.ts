


export interface IRepository<T, D> {
  getAll: () => Promise<T[] | undefined>
  getById: (id: number) => Promise<T | undefined>
  update: (id: number, data: Partial<D>) => Promise<T>
  remove: (id: number) => Promise<void>
  paginate: (params: Pagination) => Promise<T[]>
  total?:(params: Pagination) => Promise<number>
  create: (data: D) => Promise<T | undefined>
}
export interface IRepository2<T, D> {
  getAll: () => Promise<T[] | undefined>
  getById: (id: number) => Promise<T | undefined>
  create: (data: D) => Promise<T | undefined | number>
}
export interface IRepository3<T, D> {
  getAll: () => Promise<T[] | undefined>
  getById: (id: number) => Promise<T | undefined>
  create: (id:number, data: D) => Promise<T | undefined>
}
export type Filter = Partial<{
  [key: string]: string
}>

export type Pagination = {
  pageSize: number
  page: number
  filter: Filter
}

export type PaginateReturnType<T> = {
  results: T[]
  total: number
  pageSize: number
  current: number
  lastPage: number
  filter?: string | Object
}


