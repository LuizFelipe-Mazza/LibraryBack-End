import { itemSale } from 'models/item_sale/types';

import {HttpError} from '../../helpers/httpError';
import { IRepository3 } from '../../models/interface';

export class itemSaleService {
  private repository: IRepository3<itemSale, Partial<itemSale>>

  constructor(repository: IRepository3<itemSale, Partial<itemSale>>) {
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
  async create(id:number, data:Partial<itemSale>){
    if(!data.id_book ||!data.price){
      throw new HttpError({message:'Compra não Cadastrada', status:404})
    }
    console.log('cheguei aqui')
   await this.repository.create(id, data);
  }

  
  
}
