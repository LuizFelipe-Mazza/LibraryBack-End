import { IRepository2 } from './../interface'
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
      const saleFounded = await db.raw('SELECT * FROM sale').debug(true)
      sale = saleFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return sale
  }

  async create(data: Partial<sale | undefined>): Promise<sale | undefined> {
    let sale: any = undefined
    try {
      const createsale = await db.raw(`INSERT INTO sale (total_sale)
    VALUES( '${data?.total_sale}')
    `)
      sale = createsale[0]
    } catch (e) {
      console.error(e)
    }
    return sale?.insertId ?? null
  }
}
export default new saleRepository()
