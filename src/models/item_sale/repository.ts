import { IRepository2 } from './../interface';
import { itemSale } from './types'
import db from '../../database'



class itemSaleRepository implements IRepository2<itemSale, Partial<itemSale>> {

  async getById(id: number): Promise<itemSale | undefined> {
    let itemSale = undefined
    try {
      const itemSaleFounded = await db
        .raw('SELECT * FROM itemSale WHERE id = ?', [id])
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
        .raw('SELECT * FROM itemSale')
        .debug(true)
      itemSale = itemSaleFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return itemSale
  }


  async create(data: Partial<itemSale>): Promise<itemSale | undefined> {
    let itemSale = undefined
    try {
      const createitemSale =
        await db.raw(`INSERT INTO itemSale ( city, comp, zip_code, street, number, state)
    VALUES('${data.id_sale}', '${data.id_book}', '${data.price}')
    `)
      itemSale = createitemSale[0][0]
    } catch (e) {
      console.error(e)
    }
    return itemSale
  }
}
export default new itemSaleRepository()
