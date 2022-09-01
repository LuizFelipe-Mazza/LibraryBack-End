import {IRepository3 } from './../interface';
import { itemSale } from './types'
import db from '../../database'



class itemSaleRepository implements IRepository3<itemSale, Partial<itemSale>> {

  async getById(id: number): Promise<itemSale | undefined> {
    let itemSale = undefined
    try {
      const itemSaleFounded = await db
        .raw('SELECT * FROM items_sale WHERE id = ?', [id])
        .debug(true)
      itemSale = itemSaleFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return itemSale
  }
  async getAll(): Promise<itemSale[] | undefined> {
    let itemSale = undefined
    try {
      const itemSaleFounded = await db
        .raw('SELECT * FROM items_sale')
        .debug(true)
      itemSale = itemSaleFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return itemSale
  }


  async create(id:number, data: Partial<itemSale>): Promise<itemSale | undefined> {
    let itemSale = undefined
    try {
      const createitemSale =
        await db.raw(`INSERT INTO items_sale (id_sale, id_book, price)
    VALUES('${id}', '${data.id_book}', '${data.price}')
    `)
      itemSale = createitemSale[0][0]
    } catch (e) {
      console.error(e)
    }
    return itemSale
  }
}
export default new itemSaleRepository()
