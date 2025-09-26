/* import { Injectable } from "@angular/core";
import { Book } from '../models/book';


@Injectable(
    {
        providedIn:"root"
    }
)
export class BookService{
    private books: Book[]=[
        {id: 1, title: 'harray potter', author: 'ABC guy', genre: 'horror', yearPublished: 2010 },
        {id: 2, title: 'USAMA BIN LADEN', author: 'DEF guy', genre: 'classic', yearPublished: 2011 },
        {id: 3, title: 'PUNJAB NAI JAUNGI', author: 'GHI guy', genre: 'romantic', yearPublished: 2012 },
        {id: 4, title: 'BETA PARH LAI', author: 'JKL guy', genre: 'motivational', yearPublished: 2013 }
    ];  //as all list must be according to defined structure of Book in book.ts in models
    
    constructor()
    {
        const saved =localStorage.getItem('books')   //checks local storage of browser to see if there is any book already present in books array. if yes so it will shown on browser as the page loads 
        if(saved) this.books=JSON.parse(saved)  //changing string to given Book fromat
    }
    
    getBooks(): Book[]{
        return this.books;
    }
    

        getBookById(id: number): Book | undefined {
  return this.books.find(book => book.id === id);
}

updateBook(updatedBook: Book): void {
  const index = this.books.findIndex(book => book.id === updatedBook.id);
  if (index !== -1) {
    this.books[index] = updatedBook;
  }
}

    viewBook(index :number) : Book{
        return this.books[index];
    }

    addBook(book:Book)
    {
        this.books.push(book);
        this.saveBook();
    }

    deleteBook(book: Book) {
  const index = this.books.findIndex(b => b.id === book.id);
  if (index > -1) {
    this.books.splice(index, 1);
    this.saveBook();
  }
}

    saveBook()
    {
        localStorage.setItem('books', JSON.stringify(this.books));
    }
}
*/

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Book } from '../models/book';

@Injectable({
  providedIn: "root"
})
export class BookService {
  private API = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  // ✅ GET all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API);
  }

  // ✅ GET book by ID (optional, not in backend yet)
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API}/${id}`);
  }

  // ✅ ADD a book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API, book);
  }

  // ✅ UPDATE book (optional, not in backend yet)
  updateBook(book: Book): Observable<any> {
    return this.http.put(`${this.API}/${book.id}`, book);
  }

  // ✅ DELETE book
  deleteBook(id : number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
