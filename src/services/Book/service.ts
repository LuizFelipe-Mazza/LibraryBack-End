import { Book } from './../../models/Books/types';
import { DbError } from '../../helpers/dbError';
import {HttpError} from '../../helpers/httpError';
import { IRepository } from '../../models/interface';

export class BookService {
  private repository: IRepository<Book, Partial<Book>>

  constructor(repository: IRepository<Book, Partial<Book>>) {
    this.repository = repository
  }

  async get(product_code: number) {
    let Book = await this.repository.getById(product_code);
    if (!Book) {
      throw new HttpError({message:'Livro não encontrado', status:404})
    }
    return Book;
  }

  async create(data:Partial<Book>){
    if(!data.name_translated ||!data.original_name ||!data.name||!data.number_of_pages ||!data.summary||!data.authors||!data.illustrators||!data.cover_image||!data.year_of_last_publication||!data.subject||!data.isbn||!data.book_number||!data.position_on_the_shelf){
      throw new HttpError({message:'Livro não Cadastrado', status:404})
    }
   await this.repository.create(data);
  }

  async update(product_code:Book['product_code'],data:Partial<Book>){
    if(!data.name_translated ||!data.original_name ||!data.name||!data.number_of_pages ||!data.summary||!data.authors||!data.illustrators||!data.cover_image||!data.year_of_last_publication||!data.subject||!data.isbn||!data.book_number||!data.position_on_the_shelf){
      throw new DbError('Livro não Atualizado')  
    }
    await this.repository.update(product_code, data);

    return  
  }
  async delete(product_code:Partial<Book["product_code"]>){
  if(!product_code){
      throw new DbError('Livro Não deletado');
  }
  //vai chamar chamar a função criada no respository e salvar no banco de dados
  this.repository.remove(product_code);

    return 
   
  }
}
