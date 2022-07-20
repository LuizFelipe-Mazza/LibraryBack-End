import { tokenGenerator } from './../helpers/tokenGenerator';
import { UserValidate } from './../services/Auth/login'
import { HttpError } from '../helpers/httpError'
import { Request, Response } from 'express'
import { IUser } from '../models/User/types'
import UserRepository  from '../models/User/repository'
import { Encrypter } from '../helpers/encrypter';

const service = new UserValidate({repository:UserRepository,
  token:tokenGenerator,
  encrypter: new Encrypter})
  
class authController {
  service: UserValidate

  constructor() {
    this.service = service
  }
  async user(req: Request<IUser>, res: Response): Promise<void> {
    const data = req.body
    console.log(data)
    try {
      let userValid = await service.handle(data)
      res.status(200).json(userValid)
    } catch (e) {
      console.error(e)
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
        return 
      }
      res.status(500).json('Erro Não Indentificado')
    }
  }
}
const controllerAuth = new authController()
export default controllerAuth
