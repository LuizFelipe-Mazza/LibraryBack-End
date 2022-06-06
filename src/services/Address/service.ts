import { Address } from '@models/address/types';
import { DbError } from '../../helpers/dbError';
import {HttpError} from '../../helpers/httpError';
import AddressRepository from '../../models/address/repository';
import { IRepository } from '@models/interface';

export class AddressService {
  private repository: IRepository<Address, Partial<Address>>

  constructor(repository: typeof AddressRepository) {
    this.repository = repository
  }

  async get(id_address: number) {
    let address = await this.repository.getById(id_address);
    if (!address) {
      throw new HttpError({message:'Endereço não encontrado', status:404})
    }
    return address;
  }

  async update(id:Address['id_address'],data:Partial<Address>){
    if(!data.city || !data.comp || !data.street || !data.zip_code || !data.state || !data.id_address || !data.number){
      throw new DbError('Endereço não Atualizado')  
    }
    await this.repository.update(id, data);

    return  
  }
  async delete(id_address:Partial<Address["id_address"]>){
  if(!id_address){
      throw new DbError('Endereço Não deletado');
  }
  //vai chamar chamar a função criada no respository e salvar no banco de dados
  this.repository.remove(id_address);

    return 
   
  }
}
