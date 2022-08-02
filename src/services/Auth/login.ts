import { HttpError } from './../../helpers/httpError'
import { ITokenGenerator } from './../../helpers/tokenGenerator'
import { UInterface } from './../../models/User/authInterface'
import { IEncrypter } from './../../helpers/encrypter'
import { IUser } from '../../models/User/types'

export type UserAuthParams = {
  repository: UInterface<IUser, Partial<IUser>>
  token: ITokenGenerator
  encrypter: IEncrypter
}

export class UserValidate {
  private repository: UInterface<IUser, Partial<IUser>>
  private token: ITokenGenerator
  private encrypter: IEncrypter

  constructor(params: UserAuthParams) {
    this.repository = params.repository
    this.token = params.token
    this.encrypter = params.encrypter
  }

  async handle(data: IUser) {
     if (!data.email || !data.password) {
       throw new HttpError({
         message: 'E-mail ou senhas inválidos',
         status: 400
       })
     }
    const user = await this.repository.getByEmail(data.email)
    if (!user) {
      throw new HttpError({ message: 'Usuário não encontrado', status: 400 })
    }
    const passwordIsValid = await this.encrypter.compare(
      data.password,
      user.password,
    )
    if (!passwordIsValid) {
      throw new HttpError({ message: 'Senha Incorreta', status: 400 })
    }
    const tokenGenerated = this.token.encode({name:user.name, email:user.email, id:user.id})
    return tokenGenerated
  }
}
