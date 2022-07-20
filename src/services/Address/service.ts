import { Address } from '../../models/address/types';
import { DbError } from '../../helpers/dbError';
import {HttpError} from '../../helpers/httpError';
import { IRepository } from '../../models/interface';

export class AddressService {
  private repository: IRepository<Address, Partial<Address>>

  constructor(repository: IRepository<Address, Partial<Address>>) {
    this.repository = repository
  }

  async get(id: number) {
    let address = await this.repository.getById(id);
    if (!address) {
      throw new HttpError({message:'Endereço não encontrado', status:404})
    }
    return address;
  }

  async create(data:Partial<Address>){
    if(!data.city ||!data.comp ||!data.street ||!data.number ||!data.zip_code||!data.state){
      throw new HttpError({message:'Endereço não Cadastrado', status:404})
    }
   await this.repository.create(data);
  }

  async update(id:Address['id'],data:Partial<Address>){
    if(!data.city || !data.comp || !data.street || !data.zip_code || !data.state || !data.id || !data.number){
      throw new DbError('Endereço não Atualizado')  
    }
    await this.repository.update(id, data);

    return  
  }
  async delete(id:Partial<Address["id"]>){
  if(!id){
      throw new DbError('Endereço Não deletado');
  }
  //vai chamar chamar a função criada no respository e salvar no banco de dados
  this.repository.remove(id);

    return 
   
  }
}
