import { IRepository, Pagination } from '../interface'
import { IUser } from './types'
import db from '../../database'
import { DbError } from '../../helpers/dbError'

 class User implements IRepository<IUser, Partial<IUser>> {

  private readonly tableName: string
  constructor() {
    this.tableName = 'user'
  }

  async getById(id: number): Promise<IUser | undefined> {
    let data = undefined
    try {
      const founded = await db
        .raw(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id])
        .debug(Boolean(process.env.DEBUG))
      data = founded[0][0]
    } catch (e) {
      console.error(e)
    }
    return data
  }

  async update(id: number, data: Partial<IUser>): Promise<IUser> {
    let dataUpdated: IUser | undefined = undefined
    try {
      const updateProvider: IUser = await db(this.tableName)
        .update({
          name: data.name,
          email: data.email,
          password: data.password,
          id_persona: data.id_persona,
          avatar: data.avatar,
          token_google: data.token_google,
        })
        .where({ id: id })
        .returning(['user.name', 'user.email', 'user.avatar'])
      dataUpdated = updateProvider
    } catch (e) {
      console.error(e)
    }
    return dataUpdated as IUser
  }

  async remove(id: number): Promise<void> {
    try {
      await db(this.tableName)
        .update({
          active: false,
        })
        .where({ id: id })
    } catch (e) {
      console.error(e)
      throw new DbError('Não foi possível excluir o usuário')
    }
  }

  async paginate(params: Pagination): Promise<IUser[]> {
    console.log(params)
    try {
      const query = db.select('*').from(this.tableName)

      Object.entries(params.filter).forEach(([key, value]) => {
        query.andWhereILike(key, `%${value}%`) //for each vai ser um objeto {"name":"Example"}
        // vai pegar os todos o itens dos objetos e buscando neles as chaves e valores
        // e vai adicionar o LIKE
      })

      const paginate = await query
        .limit(params.pageSize)
        .offset((params.page - 1) * params.pageSize)
      return paginate
    } catch (e) {
      console.error(e)
      throw new DbError(
        'Ocorreu um erro inesperado, tente novamente ou consulte o suporte!',
      )
    }
  }

  async total(params: Pagination): Promise<number> {
    const query = db
      .count('* as total')
      .from(this.tableName)
      .leftJoin('address', function () {
        this.on('id_address', '=', 'provider.id_address').orOn(
          'id_address',
          '=',
          'provider.id',
        )
      })
    Object.entries(params.filter).forEach(([key, value]) => {
      query.andWhereILike(key, `%${value}%`)
    })
    const totalResult = await query
    console.log(totalResult)
    return Number(totalResult[0].total)
  }

  async create(data: Partial<IUser>): Promise<IUser | undefined> {
    let provider = undefined
    try {
      const createProvider = await db(this.tableName).insert({
        name: data.name,
        email: data.email,
        password: data.password,
        active: 1,
        avatar: data.avatar,
        date_agree_use_terms: data.date_agree_use_terms,
        token_google: data.token_google || null,
      })
      provider = createProvider[0][0]
    } catch (e) {
      console.error(e)
    }
    return provider
  }
}
const UserRepository = new User()
export default UserRepository