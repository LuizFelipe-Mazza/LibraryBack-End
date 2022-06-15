import { Pagination, PaginateReturnType } from './../../models/interface'

import { Provider } from '../../models/provider/typesProvider'
import { DbError } from '../../helpers/dbError'
import { HttpError } from '../../helpers/httpError'
import { IRepository } from '@models/interface'

export class ProviderService {
  private repository: Required < IRepository<Provider, Partial<Provider>>>

  constructor(repository: Required <IRepository<Provider, Partial<Provider>>>) {
    this.repository = repository
  }
  async get(id: number) {
    let provider = await this.repository.getById(id)
    if (!provider) {
      throw new HttpError({ message: 'Fornecedor não encontrado', status: 404 })
    }
    return provider
  }

  async update(data: Partial<Provider>) {
    if (
      !data.name ||
      !data.name_fant ||
      !data.email ||
      !data.cnpj ||
      !data.phone_number ||
      !data.id ||
      !data.id_address
    ) {
      throw new DbError('Forncedor não Atualizado')
    }
    return data
  }
  async delete(id: Partial<Provider['id']>) {
    if (!id) {
      throw new DbError('Fornecedor Não deletado')
    }
    this.repository.remove(id)

    return
  }

  async create(data: Partial<Provider>) {
    if (
      !data.name ||
      !data.name_fant ||
      !data.id_address ||
      !data.email ||
      !data.cnpj ||
      !data.phone_number ||
      !data.cel
    ) {
      throw new HttpError({ message: 'Fornecedor não Cadastrado', status: 404 })
    }
    await this.repository.create(data)
  }

  async paginate(params: Pagination): Promise<PaginateReturnType<Provider>> {
    params.page = params.page || 1
    params.pageSize = params.pageSize || 10
    params.filter = params.filter ?? {}
    const providers = await this.repository.paginate(params)
    const total = await this.repository.total(params)
    return {
      results: providers,
      total: total,
      pageSize: params.pageSize,
      current: params.page,
      lastPage: 2, // TODO: CALCULAR QUAL A ÚTILMA PÁGINA COM BASE NO TOTAL E NO TAMANHO DA PÁIGINA 'pageSize'
      filter: params.filter,
    }
  }
}
