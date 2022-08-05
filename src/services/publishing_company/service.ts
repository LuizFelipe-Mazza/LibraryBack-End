
import { Publishing_company } from 'models/publishing_company';
import { DbError } from '../../helpers/dbError';
import {HttpError} from '../../helpers/httpError';
import { IRepository } from '../../models/interface';

export class PublishingService {
  private repository: IRepository<Publishing_company, Partial<Publishing_company>>

  constructor(repository: IRepository<Publishing_company, Partial<Publishing_company>>) {
    this.repository = repository
  }

  async get(id: number) {
    let Publishing_company = await this.repository.getById(id);
    if (!Publishing_company) {
      throw new HttpError({message:'Endereço não encontrado', status:404})
    }
    return Publishing_company;
  }

  async create(data:Partial<Publishing_company>){
    if(!data.city ||!data.state ||!data.road ||!data.number ||!data.telephone||!data.state||!data.discrict||!data.name){
      throw new HttpError({message:'Editora não Cadastrada', status:404})
    }
   await this.repository.create(data);
  }

  async update(id:Publishing_company['id'],data:Partial<Publishing_company>){
    if(!data.city ||!data.state ||!data.road ||!data.number ||!data.telephone||!data.state|| !data.discrict||!data.name){
      throw new DbError('Editora não Atualizada')  
    }
    await this.repository.update(id, data);

    return  
  }
  async delete(id:Partial<Publishing_company["id"]>){
  if(!id){
      throw new DbError('Editora Não deletada');
  }
  //vai chamar chamar a função criada no respository e salvar no banco de dados
  this.repository.remove(id);

    return 
   
  }
}
