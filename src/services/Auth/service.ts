import { DbError } from '../../helpers/dbError'
import { HttpError } from '../../helpers/httpError'
import { IRepository, PaginateReturnType, Pagination } from '@models/interface'
import { IUser } from '@models/User/types'
export class UserAuth {
  private repository: IRepository<IUser, Partial<IUser>>

  constructor(repository: Required<IRepository<IUser, Partial<IUser>>>) {
    this.repository = repository
  }

  async signIn(data: Partial<IUser>) {
    if (!data.email || !data.password) {
      throw new DbError('Necessário e-mail e senha para entrar')
    }
    await this.repository.create(data)
  }

  async get(id: number) {
    let user = await this.repository.getById(id)
    if (!user) {
      throw new HttpError({ message: 'Usuário Não encotrado', status: 404 })
    }
    console.log(user)
    return user
  }

  async update(data: Partial<IUser>) {
    if (
     !data.name && !data.avatar && !data.email && !data.password) {
      throw new DbError('Informações não alteradas')
    }
    return data
  }

  async delete(id: Partial<IUser['id']>) {
    if (!id) {
      throw new DbError('Usuário Não deletado')
    }
    this.repository.remove(id)

    return
  }

  async create(data: Partial<IUser>) {
    if (
      !data.name ||
      !data.email ||
      !data.password
    ) {
      throw new HttpError({ message: 'Usuário não Cadastrado', status: 404 })
    }
    await this.repository.create(data)
  }

  async paginate(params: Pagination): Promise<PaginateReturnType<IUser>> {
    params.page = params.page || 1
    params.pageSize = params.pageSize || 10
    params.filter = params.filter ?? {}
    const users = await this.repository.paginate(params)
    if(!this.repository.total){
      throw new Error('Não houve total de usuarios')
    }
    const total = await this.repository.total(params)
    return {
      results: users,
      total: total,
      pageSize: params.pageSize,
      current: params.page,
      lastPage: 2, // TODO: CALCULAR QUAL A ÚTILMA PÁGINA COM BASE NO TOTAL E NO TAMANHO DA PÁIGINA 'pageSize'
      filter: params.filter,
    }
  }
}
