import { AddressService } from './service'
import {Address} from '../../models/address'
import {RepositoryMocked} from '../../test/mocks/model'
// SUT => SUBJECT UNDER TEST

function makeSut() {
  const db = new RepositoryMocked<Address, Partial<Address>>([{
    id_address: 1,
    city: 'Teste',
    comp: null,
    zip_code: '00000000',
    street: 'Rua teste',
    state: 'TE',
    number: "0123",
  }], "id_address")
  const service = new AddressService(db)
  return {
    service, db
  }
}

describe("Address services", () => {
  it("should trow if an user is not founded", async () => {
    const { service } = makeSut()

    expect(await service.get(0)).rejects.toThrow()
  })
  it("should return a value from db", async () => {
    const { service, db } = makeSut()

    expect(await service.get(1)).resolves.toBe(db.data[0])
  })
})