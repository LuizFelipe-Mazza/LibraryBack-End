import { HttpError } from '../helpers/httpError'
import { ProviderService } from '../services/Provider/serviceProvider'
import { Provider } from '@models/provider/typesProvider'
import { Request, Response } from 'express'
import  ProviderRepository  from '../models/provider/repositoryProvider'
import { DbError } from '../helpers/dbError'

const service  = new ProviderService(ProviderRepository);

class providerController {
  service: ProviderService
  constructor() {
    this.service = service;
  }
  async ptovider(req: Request<Provider>, res: Response): Promise<void> {
    const { id } = req.params
    try {
      let provider = await this.service.get(id)
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
      let address = await service.update(data);
      res.status(200).json(address);
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
      let address = await service.delete(data.id_address);
      console.log(address);
      res.status(200).json('Endereço deletado');
      return 
    } catch (e) {
      if (e instanceof DbError) {
        res.json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado');
    }
  }

}
const controller = new providerController()
export default controller
