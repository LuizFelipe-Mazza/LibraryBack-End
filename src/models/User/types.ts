export type IUser = {
  id?: number
  name: string
  email: string
  password: string
  active: boolean | 1 | 0
  id_persona?: number
  avatar?: Link
  hash_recovery_password: string | null
  date_agree_use_terms: string | Date
  token_google: string
}

type Link = string
