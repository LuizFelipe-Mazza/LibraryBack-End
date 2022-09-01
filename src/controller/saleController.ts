import { HttpError } from '../helpers/httpError'
import { saleService } from '../services/sale/service'
import { Request, Response } from 'express'
import { sale, saleRepository } from '../models/sale'
import itemSaleRepository from '../models/item_sale/repository'
import { itemSaleService } from '../services/itemSale/service'


class saleController {

  async createsale(req: Request<sale>, res: Response): Promise<void> {
    const service = new saleService(saleRepository);
    const itemService = new itemSaleService(itemSaleRepository);
    const data = req.body

    try {
     const idSale =  await service.create(data)
     data.products.forEach(async product => {await itemService.create(Number(idSale),product)})
      res.status(200).json('Compra realizada com sucesso')
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
    return data
  }

  async sale(req: Request<sale>, res: Response): Promise<void> {
    const { id } = req.params
    const service = new saleService(saleRepository)
    try {
      let sale = await service.get(id)

      res.status(200).json(sale)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  
  

  
}
const controller = new saleController()
export default controller
