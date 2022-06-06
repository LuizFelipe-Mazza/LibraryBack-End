import { Address } from './types'
import db from '../../database'
import { IRepository, PaginateReturnType, Pagination } from '../interface'

class AddressRepository implements IRepository<Address, any> {
  async getById(id_address: number): Promise<Address | undefined> {
    let address = undefined
    try {
      const addressFounded = await db
        .raw('SELECT * FROM address WHERE id_address = ?', [id_address])
        .debug(true)
      address = addressFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return address
  }

  async update(id_address: number, data: Partial<Address>): Promise<any> {
    let address = undefined
    try {
      const updateAddress = await db
        .raw(
          'UPDATE address SET zip_code = ?, state = ?, city = ?, street = ?, number = ?, comp = ? WHERE id_address = ?',
          [
            //seguir respectivamente conforme foi digitado no SET
            data.zip_code as string,
            data.state as string,
            data.city as string,
            data.street as string,
            data.number as number,
            data.comp ? data.comp : '',
            id_address,
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

  async remove(id_address: number): Promise<void> {
    let address: any = undefined
    try {
      const deleteAddress = db.raw('DELETE FROM address WHERE id_address = ?', [
        id_address,
      ])
      //não precisa informar a posição dentro do array
      address = deleteAddress
    } catch (e) {
      console.error(e)
    }
    return address
  }
  async paginate(
    params: Pagination<Partial<Address>>,
  ): Promise<PaginateReturnType<Address>> {
    throw new Error('Not Implemented yet')
  }
  async create(data: any): Promise<Address> {
    throw new Error('Not Implemented yet')
  }
}
export default new AddressRepository()
