import { Address } from './types'
import db from '../../database'
import { IRepository, Pagination } from '../interface'

class AddressRepository implements IRepository<Address, Partial<Address>> {

  async getById(id: number): Promise<Address | undefined> {
    let address = undefined
    try {
      const addressFounded = await db
        .raw('SELECT * FROM address WHERE id = ?', [id])
        .debug(true)
      address = addressFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return address
  }
  async getAll(): Promise<Address[] | undefined> {
    let address = undefined
    try {
      const addressFounded = await db
        .raw('SELECT * FROM address')
        .debug(true)
      address = addressFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return address
  }

  async update(id: number, data: Partial<Address>): Promise<any> {
    let address = undefined
    try {
      const updateAddress = await db
        .raw(
          'UPDATE address SET zip_code = ?, state = ?, city = ?, street = ?, number = ?, comp = ? WHERE id = ?',
          [
            //seguir respectivamente conforme foi digitado no SET
            data.zip_code as string,
            data.state as string,
            data.city as string,
            data.street as string,
            data.number as number,
            data.comp ? data.comp : '',
            id,
          ],
        )
        .debug(true)
      console.log()
      //precisou indicar a posição dentro do array
      address = updateAddress[0][0]
      console.log(address)
    } catch (e) {
      console.error(e)
    }
    return address
  }

  async remove(id: number): Promise<void> {
    let address: any = undefined
    try {
      const deleteAddress = db.raw('DELETE FROM address WHERE id = ?', [id])
      //não precisa informar a posição dentro do array
      address = deleteAddress
    } catch (e) {
      console.error(e)
    }
    return address
  }
  async paginate(
    params: Pagination): Promise<Address[]> {
    throw new Error('Not Implemented yet')
  }
  async create(data: Partial<Address>): Promise<Address | undefined> {
    let address = undefined
    try {
      const createAddress =
        await db.raw(`INSERT INTO address ( city, comp, zip_code, street, number, state)
    VALUES('${data.city}', '${data.comp}', '${data.zip_code}','${data.street}','${data.number}','${data.state}')
    `)
      address = createAddress[0][0]
    } catch (e) {
      console.error(e)
    }
    return address
  }
}
export default new AddressRepository()
