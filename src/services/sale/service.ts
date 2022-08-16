import { IRepository2 } from './../../models/interface';
import { sale } from '../../models/sale/types';

import {HttpError} from '../../helpers/httpError';


export class saleService {
  private repository: IRepository2<sale, Partial<sale>>

  constructor(repository: IRepository2<sale, Partial<sale>>) {
    this.repository = repository
  }

  async get(id: number) {
    let sale = await this.repository.getById(id);
    if (!sale) {
      throw new HttpError({message:'Endereço não encontrado', status:404})
    }
    return sale;
  }
  async getAll() {
    let 
    sale = await this.repository.getAll();
    if (!sale) {
      throw new HttpError({message:'Os Livros não foram encontrados', status:404})
    }
    return sale;
  }
  async create(data:Partial<sale>){
    if(!data.id_user ||!data.id_address ||!data.total_sale ||!data.payment_type){
      throw new HttpError({message:'Compra não Cadastrada', status:404})
    }
   await this.repository.create(data);
  }

  
  
}
