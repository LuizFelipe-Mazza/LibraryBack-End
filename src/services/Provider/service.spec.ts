import { ProviderService } from '../../services/Provider/serviceProvider';
import {Provider} from '../../models/provider/typesProvider'
import {RepositoryMocked} from '../../test/mocks/model'
// SUT => SUBJECT UNDER TEST

function makeSut() {
  const db = new RepositoryMocked<Provider, Partial<Provider>>([{
    id: 1,
    id_address:1,
    name_fant: 'Teste',
    name:'test2',
    phone_number: '00000000',
    email: '@example.com',
    cnpj: "0123",
  }], "id")
  const service = new ProviderService(db)
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