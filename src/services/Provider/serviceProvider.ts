import { Provider } from '../../models/provider/typesProvider';
import { DbError } from '../../helpers/dbError';
import {HttpError} from '../../helpers/httpError';
import ProviderRepository from '../../models/provider/repositoryProvider';
import { IRepository } from '@models/interface';

export class ProviderService {
  private repository: IRepository<Provider, Partial<Provider>>

  constructor(repository: typeof ProviderRepository) {
    this.repository = repository
  }

  async get(id: number) {
    let provider = await this.repository.getById(id);
    if (!provider) {
      throw new HttpError({message:'Fornecedor não encontrado', status:404})
    }
    return provider;
  }

  async update(data:Partial<Provider>){
    if(!data.name || !data.name_fant || !data.email || !data.cnpj || !data.phone_number || !data.id || !data.id_address){
      throw new DbError('Forncedor não Atualizado')  
    }
    return data;
   
  }
  async delete(id:Partial<Provider["id"]>){
  if(!id){
      throw new DbError('Fornecedor Não deletado');
  }
  this.repository.remove(id);

    return 
   
  }
}
