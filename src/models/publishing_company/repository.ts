import { Publishing_company } from './types'
import db from '../../database'
import { IRepository, Pagination } from '../interface'

class Publishing_company_Repository implements IRepository<Publishing_company, any> {
  async getById(id: number): Promise<Publishing_company| undefined> {
    let publishing_company = undefined
    try {
      const publishing_company_Founded = await db
        .raw('SELECT * FROM publishing_company WHERE id = ?', [id])
        .debug(true)
      publishing_company = publishing_company_Founded[0][0]
    } catch (e) {
      console.error(e)
    }
    return publishing_company
  }

  async update(id: number, data: Partial<Publishing_company>): Promise<any> {
    let Publishing_company = undefined
    try {
      const updatePublish_company = await db
        .raw(
          'UPDATE publishing_company SET name = ?, state = ?, city = ?, road = ?, number = ?, telephone = ?, discrit = ?, site = ? WHERE id = ?',
          [
            //seguir respectivamente conforme foi digitado no SET
            data.name as string,
            data.state as string,
            data.city as string,
            data.road as string,
            data.number as number,
            data.telephone as string,
            data.discrict as string,
            data.site as string,
            id,
          ],
        )
        .debug(true)
      console.log()
      //precisou indicar a posição dentro do array
      Publishing_company = updatePublish_company[0][0]
      console.log(Publishing_company)
    } catch (e) {
      console.error(e)
    }
    return Publishing_company
  }

  async remove(id: number): Promise<void> {
    let Publishing_company: any = undefined
    try {
      const deletePublish_company = db.raw('DELETE FROM publishing_company WHERE id = ?', [id])
      //não precisa informar a posição dentro do array
      Publishing_company = deletePublish_company
    } catch (e) {
      console.error(e)
    }
    return Publishing_company
  }
  async paginate(
    params: Pagination): Promise<Publishing_company[]> {
    throw new Error('Not Implemented yet')
  }
  async create(data: Partial<Publishing_company>): Promise<Publishing_company | undefined> {
    let Publishing_company = undefined
    try {
      const createPublish_company =
        await db.raw(`INSERT INTO publishing_company ( city, number, state, discrict, site,name, telephone,road)
    VALUES('${data.city}', '${data.discrict}', '${data.road}','${data.telephone}','${data.number}','${data.state}','${data.site}')
    `)
      Publishing_company = createPublish_company[0][0]
    } catch (e) {
      console.error(e)
    }
    return Publishing_company
  }
}
export default new Publishing_company_Repository()
