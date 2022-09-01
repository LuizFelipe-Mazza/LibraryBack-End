import { itemSaleRepository,itemSale } from './../models/item_sale/index';
import { HttpError } from '../helpers/httpError'
import { itemSaleService } from '../services/itemSale/service'
import { Request, Response } from 'express'



class itemSaleController {
  async createitemSale(req: Request<itemSale>, res: Response): Promise<void> {
    const service = new itemSaleService(itemSaleRepository)
    const data = req.body
    const {id} = req.params

    try {
      await service.create(id,data)
      res.status(200).json('item adicionado com sucesso')
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
    return data
  }

  async itemSale(req: Request<itemSale>, res: Response): Promise<void> {
    const { id } = req.params
    const service = new itemSaleService(itemSaleRepository)
    try {
      let itemSale = await service.get(id)

      res.status(200).json(itemSale)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

}
const controller = new itemSaleController()
export default controller
