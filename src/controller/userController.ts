import { Pagination } from './../models/interface';
import { HttpError } from '../helpers/httpError'
import { Request, Response } from 'express'
import { DbError } from '../helpers/dbError'
import { UserAuth } from '../services/Auth/service';
import { IUser } from '../models/User/types';
import UserRepository from '../models/User/repository';


const service = new UserAuth(UserRepository)

class userController {
  service: UserAuth
  constructor() {
    this.service = service
  }
  async user(req: Request<IUser>, res: Response): Promise<void> {
    const {id} = req.params;
    try {
      let user = await service.get(id)
      res.status(200).json(user)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async UpdateUser(req: Request<IUser>, res: Response): Promise<void> {
    const data = req.params
    const service = new UserAuth(UserRepository)

    try {
      let user = await service.update(data)
      res.status(200).json(user)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async deleteUser(req: Request<IUser>, res: Response): Promise<void> {
    const data = req.params
    const service = new UserAuth(UserRepository)
    try {
      await service.delete(data.id)
      res.status(200).json('Conta deletada')
      return
    } catch (e) {
      if (e instanceof DbError) {
        res.json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }
  async createuser(req: Request<IUser>, res: Response): Promise<void> {
    const service = new UserAuth(UserRepository)
    const data = req.body

    try {
      await service.create(data)
      res.status(200).json('Usuário cadastrado com sucesso');
    } 
    catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
    return data
  }

  async paginate(req: Request<IUser>, res: Response): Promise<void> {
    console.log(req.query);
    const params:Pagination = {
      pageSize:Number(req.query.pageSize),
      page:Number(req.query.page),
      filter:req.query.filter != '{}' ? JSON.parse(String(req.query.filter)) : {}
    };
    try {
    let users = await service.paginate(params)
    
      res.status(200).json(users)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      if(params.filter === {}){
        res.status(400).json('Nenhumm filtro inserido');
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

}
const controller = new userController()
export default controller
