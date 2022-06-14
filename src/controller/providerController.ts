import { Pagination } from './../models/interface';
import { HttpError } from '../helpers/httpError'
import { ProviderService } from '../services/Provider/serviceProvider'
import { Provider } from '@models/provider/typesProvider'
import { Request, Response } from 'express'
import ProviderRepository from '../models/provider/repositoryProvider'
import { DbError } from '../helpers/dbError'

const service = new ProviderService(ProviderRepository)

class providerController {
  service: ProviderService
  constructor() {
    this.service = service
  }
  async provider(req: Request<Provider>, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      let provider = await service.get(id)
      res.status(200).json(provider)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async UpdateProvider(req: Request<Provider>, res: Response): Promise<void> {
    const data = req.params
    const service = new ProviderService(ProviderRepository)

    try {
      let provider = await service.update(data)
      res.status(200).json(provider)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async deleteProvider(req: Request<Provider>, res: Response): Promise<void> {
    const data = req.params
    const service = new ProviderService(ProviderRepository)
    try {
      await service.delete(data.id)
      res.status(200).json('Endereço deletado')
      return
    } catch (e) {
      if (e instanceof DbError) {
        res.json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }
  async createProvider(req: Request<Provider>, res: Response): Promise<void> {
    const service = new ProviderService(ProviderRepository)
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

  async paginate(req: Request<Provider>, res: Response): Promise<void> {
    const params:Pagination = {
      pageSize:Number(req.query.pageSize),
      page:Number(req.query.page),
      filter:JSON.parse(String(req.query.filter))
    };
    try {
    let providers = await service.paginate(params)
      res.status(200).json(providers)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

}
const controller = new providerController()
export default controller
