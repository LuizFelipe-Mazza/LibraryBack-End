import * as _interface from '../../models/interface'

type dataItem<Type> = {
  readonly [attribute in keyof Type]: Type[attribute]
}

export class RepositoryMocked<T, D> implements _interface.IRepository<T, D> {
  data: dataItem<T>[]
  idName: any
  constructor(data, idName) {
    this.data = data
    this.idName = idName
  }
  async getById(id: number): Promise<T | undefined> {
    // @ts-ignore
    const response = await this.data.find(item => item[this.idName] === id)
    return response
  }

  async update(id: number, data: Partial<D>): Promise<T> {
    // @ts-ignore
    const index = this.data.findIndex(item => (item[this.idName] = id))
    const columns = Object.getOwnPropertyNames(data)
    columns.map(column => {
      this.data[index][column] = data[column]
    })
    return await this.data[index]
  }
  async remove(id: number): Promise<void> {
    // @ts-ignore
    const index = this.data.findIndex(item => (item[this.idName] = id))
    await this.data.splice(index, 1)
  }
  async paginate(params: _interface.Pagination<Partial<T>>): Promise<_interface.PaginateReturnType<T>> {
    throw new Error('Not implemented yet')
  }
  async create(data: D): Promise<T> {
    // @ts-ignore
    this.data.push(data)
    return this.data[this.data.length - 1]
  }
}
