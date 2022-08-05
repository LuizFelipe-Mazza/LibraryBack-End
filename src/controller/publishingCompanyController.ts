import { PublishingService } from './../services/publishing_company/service';
import { Publishing_company } from './../models/publishing_company/types';
import { HttpError } from '../helpers/httpError'
import { Request, Response } from 'express'
import { Publishing_company_Repository } from '../models/publishing_company'
import { DbError } from '../helpers/dbError'

class Publishing_companyController {
  async createPublishingCompany(req: Request<Publishing_company>, res: Response): Promise<void> {
    const service = new PublishingService(Publishing_company_Repository)
    const data = req.body

    try {
      await service.create(data)
      res.status(200).json('Endereço cadastrado com sucesso')
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
    return data
  }

  async Publishing_company(req: Request<Publishing_company>, res: Response): Promise<void> {
    const { id } = req.params
    const service = new PublishingService(Publishing_company_Repository)
    try {
      let Publishing_company = await service.get(id)

      res.status(200).json(Publishing_company)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async UpdatePublishing_company(
    req: Request<Publishing_company['id'], Publishing_company>,
    res: Response,
  ): Promise<void> {
    const id = req.params

    const data = req.body

    

    const service = new PublishingService(Publishing_company_Repository)

    try {
      let Publishing_company = await service.update(id, data)
      res.status(200).json(Publishing_company)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async deletePublishing_company(
    req: Request<Publishing_company['id'], Publishing_company>,
    res: Response,
  ): Promise<void> {
    const id = req.params

    const service = new PublishingService(Publishing_company_Repository)

    try {
      let Publishing_company = await service.delete(id)
      res.status(200).json('Endereço deletado')
      res.status(200).json(Publishing_company)
    } catch (e) {
      if (e instanceof DbError) {
        res.json(e.message)
      }

      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }

    return
  }
}
const controller = new Publishing_companyController()
export default controller
