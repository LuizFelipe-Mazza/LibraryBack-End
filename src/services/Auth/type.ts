import { IEncrypter } from '@helpers/encrypter'
import { User, IUser } from '../../models/User'
import { ICreateUserToken } from './createUserToken'

export interface CreateCustomerConstructor {
  new (dependencies: Dependencies): CreateCustomerUseCase
}
export type Dependencies = {
  repository: User
  encrypter: IEncrypter
  createUserToken: ICreateUserToken
}
export interface CreateCustomerUseCase {
  handle(userDTO: AuthDTO): Promise<UserAuthenticated>
}

export type AuthDTO = {
  email: IUser['email']
  password: IUser['password']
}

export type UserAuthenticated = {
  name: IUser['name']
  email: IUser['email']
  id: IUser['id']
  token: string
}
