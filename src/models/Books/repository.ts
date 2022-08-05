import { Book } from './types'
import db from '../../database'
import { IRepository, Pagination } from '../interface'

class BookRepository implements IRepository<Book, any> {
  async getById(product_code : number): Promise<Book | undefined> {
    let Book = undefined
    try {
      const BookFounded = await db
        .raw('SELECT * FROM book WHERE id = ?', [product_code])
        .debug(true)
      Book = BookFounded[0][0]
    } catch (e) {
      console.error(e)
    }
    return Book
  }

  async update(product_code : number, data: Partial<Book>): Promise<any> {
    let Book = undefined
    try {
      const updateBook = await db
        .raw(
          'UPDATE book SET authors = ?, illustradors  = ?, cover_image = ?, year_of_last_publication = ?,subject = ?,isbn= ?,book_number = ?, position_on_the_shelf = ?, name = ?, original_name = ?,name_translated = ?, number_of_pages = ?,summary = ? WHERE product_code = ?',
          [
            //seguir respectivamente conforme foi digitado no SET
            data.authors as string,
            data.illustrators as string,
            data.cover_image as string,
            data.year_of_last_publication as Date,
            data.subject as string,
            data.product_code as number,
            data.isbn as string,
            data.book_number as string,
            data.position_on_the_shelf as string,
            data.name as string,
            data.original_name as string,
            data.name_translated as string,
            data.number_of_pages as number,
            data.summary as string,


          ],
        )
        .debug(true)
      console.log()
      //precisou indicar a posição dentro do array
      Book = updateBook[0][0]
      console.log(Book)
    } catch (e) {
      console.error(e)
    }
    return Book
  }

  async remove(product_code : number): Promise<void> {
    let Book: any = undefined
    try {
      const deleteBook = db.raw('DELETE FROM book WHERE product_code  = ?', [product_code ])
      //não precisa informar a posição dentro do array
      Book = deleteBook
    } catch (e) {
      console.error(e)
    }
    return Book
  }
  async paginate(
    params: Pagination): Promise<Book[]> {
    throw new Error('Not Implemented yet')
  }
  async create(data: Partial<Book>): Promise<Book | undefined> {
    let Book = undefined
    try {
      const createBook =
        await db.raw(`INSERT INTO book ( authors, illustradors, cover_image, year_of_last_publication,subject,isbn,book_number, position_on_the_shelf, name, original_name,name_translated, number_of_pages,summary) 
    VALUES('${data.authors}', '${data.illustrators}', '${data.cover_image}','${data.year_of_last_publication}','${data.subject}','${data.isbn}','${data.book_number}','${data.position_on_the_shelf}','${data.name}','${data.original_name}','${data.name_translated}','${data.number_of_pages}','${data.summary}')
`)
      Book = createBook[0][0]
    } catch (e) {
      console.error(e)
    }
    return Book
  }
}
export default new BookRepository()
