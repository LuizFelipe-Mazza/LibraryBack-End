import { UInterface } from './../../models/User/authInterface';
import { DbError } from '../../helpers/dbError'
import { HttpError } from '../../helpers/httpError'
import {PaginateReturnType, Pagination } from '../../models/interface'

import { IEncrypter } from 'helpers';
import { IUser } from 'models/User/types';
import { UserAuthParams } from './login';
export class UserAuth {
  private repository: UInterface<IUser, Partial<IUser>>
  private encrypter: IEncrypter

  constructor(params:UserAuthParams) {
    this.repository = params.repository
    this.encrypter =  params.encrypter
  }


  async signIn(data: Partial<IUser>) {
    if (!data.email || !data.password) {
      throw new HttpError({message:'Necessário e-mail e senha para entrar', status:400})
    }
    const user = this.repository.getByEmail(data.email)
    if(!user){
      throw new HttpError({message:'Usuário não encontrado', status:400})
    }
    
     //encotrar o usuário por email
     //retornar erro se o usuário não existir
     //se o usuário existir verficar com o encrypter(compare) se a senha é válida
     //caso a senha não seja válida, retornar erro
     //caso a senha seja válida gerar Token com os dados de usuário(email, nome e id)
     //retornar Token e informações de usuário(email, nome e persona_id)
        return user
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
    const userFounded = await this.repository.getByEmail(data.email)
    if(userFounded && userFounded.active){
      throw new HttpError({message:'E-mail ja cadastrado', status:400})
    }
    const hashedPassword = await this.encrypter.encrypt(data.password)
    await this.repository.create({name:data.name, email:data.email, password:hashedPassword})
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
