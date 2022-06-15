import db from '../../database'
import { IRepository, Pagination } from '../interface'
import { Provider } from './typesProvider'

class ProviderRepository implements IRepository<Provider, Partial<Provider>> {
  async getById(id: number): Promise<Provider | undefined> {
    let provider = undefined
    try {
      const providerFounded = await db
        .raw('SELECT * FROM provider WHERE id = ?', [id])
        .debug(true)
      provider = providerFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return provider
  }

  async update(id: number, data: Partial<Provider>): Promise<any> {
    let provider = undefined
    try {
      const updateProvider = await db.raw(
        'UPDATE provider SET name = ?, name_fant = ?, cnpj = ?,  phone_number = ?, cel = ?, email = ? WHERE id = ?',
        [
          id,
          data.id_address as number,
          data.name as string,
          data.name_fant as string,
          data.cnpj as string,
          data.phone_number as string,
          data.cel as string,
          data.email as string,
        ],
      )
      provider = updateProvider[0][0]
    } catch (e) {
      console.error(e)
    }
    return provider
  }

  async remove(id: number): Promise<void> {
    let provider = undefined
    try {
      const deleteProvider = db.raw(
        'DELETE FROM provider WHERE id_address = ?',
        [id],
      )
      provider = deleteProvider[0][0]
      console.log(provider)
    } catch (e) {
      console.error(e)
    }
    return provider
  }
  async paginate(params: Pagination): Promise<Provider[]> {
    console.log(params)
    try {
      const query = db
        .select('*')
        .from('provider')
        .leftJoin('address', function () {
          this.on('id_address', '=', 'provider.id_address').orOn(
            'id_address',
            '=',
            'provider.id',
          )
        })
      Object.entries(params.filter).forEach(([key, value]) => {
        query.andWhereILike(key, `%${value}%`) //for each vai ser um objeto {"name":"Example"}
        // vai pegar os todos o itens dos objetos e buscando neles as chaves e valores
        // e vai adicionar o LIKE
      })
      const paginate = await query
        .limit(params.pageSize)
        .offset((params.page - 1) * params.pageSize)
      console.log(params)
      return paginate
    } catch (e) {
      console.error(e)
      throw new Error('houve um erro')
    }
  }
async total(params: Pagination): Promise<number> {
    const query = db
      .count('* as total')
      .from('provider')
      .leftJoin('address', function () {
        this.on('id_address', '=', 'provider.id_address')
        .orOn('id_address','=','provider.id',
        )
      })
    Object.entries(params.filter).forEach(([key, value]) => {
      query.andWhereILike(key, `%${value}%`)
    })
    const totalResult = await query
    console.log(totalResult);
    return Number(totalResult[0].total)
  }

  async create(data: Partial<Provider>): Promise<Provider | undefined> {
    let provider = undefined
    try {
      const createProvider =
        await db.raw(`INSERT INTO provider ( id_address, name, name_fant, cnpj,  phone_number, cel, email)
    values('${data.id_address}', '${data.name}', '${data.name_fant}','${data.cnpj}','${data.phone_number}', '${data.cel}', '${data.email}')
    `)
      provider = createProvider[0][0]
    } catch (e) {
      console.error(e)
    }
    return provider
  }
}
export default new ProviderRepository()
