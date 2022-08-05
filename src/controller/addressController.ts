import { HttpError } from '../helpers/httpError'
import { AddressService } from '../services/Address/service'
import { Request, Response } from 'express'
import { Address, AddressRepository } from '../models/address'
import { DbError } from '../helpers/dbError'

class addressController {
  async createAddress(req: Request<Address>, res: Response): Promise<void> {
    const service = new AddressService(AddressRepository)
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

  async address(req: Request<Address>, res: Response): Promise<void> {
    const { id } = req.params
    const service = new AddressService(AddressRepository)
    try {
      let address = await service.get(id)

      res.status(200).json(address)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async UpdateAddress(
    req: Request<Address['id'], Address>,
    res: Response,
  ): Promise<void> {
    const id = req.params

    const data = req.body

    const service = new AddressService(AddressRepository)

    try {
      let address = await service.update(id, data)
      res.status(200).json(address)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async deleteAddress(
    req: Request<Address['id'], Address>,
    res: Response,
  ): Promise<void> {
    const id = req.params

    const service = new AddressService(AddressRepository)

    try {
      let address = await service.delete(id)
      res.status(200).json('Endereço deletado')
      res.status(200).json(address)
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
const controller = new addressController()
export default controller
