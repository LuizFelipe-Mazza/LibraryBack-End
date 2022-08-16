import { IRepository2 } from './../interface';
import { sale } from './types'
import db from '../../database'


class saleRepository implements IRepository2<sale, Partial<sale>> {

  async getById(id: number): Promise<sale | undefined> {
    let sale = undefined
    try {
      const saleFounded = await db
        .raw('SELECT * FROM sale WHERE id = ?', [id])
        .debug(true)
      sale = saleFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return sale
  }
  async getAll(): Promise<sale[] | undefined> {
    let sale = undefined
    try {
      const saleFounded = await db
        .raw('SELECT * FROM sale')
        .debug(true)
      sale = saleFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return sale
  }

  async create(data: Partial<sale>): Promise<sale | undefined> {
    let sale = undefined
    try {
      const createsale =
        await db.raw(`INSERT INTO sale ( city, comp, zip_code, street, number, state)
    VALUES('${data.id_user}', '${data.id_address}', '${data.total_sale}','${data.payment_type}')
    `)
      sale = createsale[0][0]
    } catch (e) {
      console.error(e)
    }
    return sale
  }
}
export default new saleRepository()
