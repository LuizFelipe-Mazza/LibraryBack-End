import { itemSale } from 'models/item_sale/types';

import {HttpError} from '../../helpers/httpError';
import { IRepository2 } from '../../models/interface';

export class itemSaleService {
  private repository: IRepository2<itemSale, Partial<itemSale>>

  constructor(repository: IRepository2<itemSale, Partial<itemSale>>) {
    this.repository = repository
  }

  async get(id: number) {
    let itemSale = await this.repository.getById(id);
    if (!itemSale) {
      throw new HttpError({message:'Compra não encontrada', status:404})
    }
    return itemSale;
  }
  async getAll() {
    let 
    itemSale = await this.repository.getAll();
    if (!itemSale) {
      throw new HttpError({message:'Os Livros não foram encontrados', status:404})
    }
    return itemSale;
  }
  async create(data:Partial<itemSale>){
    if(!data.id_sale||!data.id_book ||!data.price){
      throw new HttpError({message:'Compra não Cadastrada', status:404})
    }
   await this.repository.create(data);
  }

  
  
}