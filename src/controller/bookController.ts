import { bookRepository } from './../models/Books/index';
import { Book } from './../models/Books/types';
import { HttpError } from '../helpers/httpError'
import { BookService } from '../services/Book/service'
import { Request, Response } from 'express'
import { DbError } from '../helpers/dbError'

class BookController {
  async createBook(req: Request<Book>, res: Response): Promise<void> {
    const service = new BookService(bookRepository)
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

  async Book(req: Request<Book>, res: Response): Promise<void> {
    const { product_code } = req.params
    const service = new BookService(bookRepository)
    try {
      let Book = await service.get(product_code)

      res.status(200).json(Book)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async UpdateBook(
    req: Request<Book['product_code'], Book>,
    res: Response,
  ): Promise<void> {
    const product_code = req.params

    const data = req.body

    

    const service = new BookService(bookRepository)

    try {
      let Book = await service.update(product_code, data)
      res.status(200).json(Book)
    } catch (e) {
      if (e instanceof HttpError) {
        res.status(e.status).json(e.message)
      }
      console.error(e)
      res.status(500).json('Erro Não Indentificado')
    }
  }

  async deleteBook(
    req: Request<Book['product_code'], Book>,
    res: Response,
  ): Promise<void> {
    const product_code = req.params

    const service = new BookService(bookRepository)

    try {
      let Book = await service.delete(product_code)
      res.status(200).json('Endereço deletado')
      res.status(200).json(Book)
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
const controller = new BookController()
export default controller
