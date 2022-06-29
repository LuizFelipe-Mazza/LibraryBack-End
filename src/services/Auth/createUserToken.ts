import { IUser } from '@models/User'

export type UserDTO = {
  id: IUser['id']
  email: IUser['email']
  id_persona: IUser['id_persona']
}

export interface ICreateUserToken {
  create(user: UserDTO, timeInHours?: number): string
}
export const TIME_IN_HOURS_DEFAULT = 2
