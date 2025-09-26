/* import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'] // ✅ fixed typo (was styleUrl)
})
export class BookList {

  books: Book[] = [];
  searchQuery: string = '';

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {
    this.books = this.bookService.getBooks(); // ✅ using the constructor-injected service
  }

  viewBook(id: number) {
    this.router.navigate(['/books', id]);
  }

  deleteBook(book : Book): void {
    this.bookService.deleteBook(book);
    this.books = this.bookService.getBooks(); // ✅ refresh list after delete
  }

  get filteredBooks(): Book[] {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  isSidebarOpen = true;
  
toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}


}
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookList {
  books: Book[] = [];
  searchQuery: string = '';
  isSidebarOpen = true;

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();  // ✅ Load books from backend
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => this.books = data,
      error: (err) => console.error('Failed to fetch books:', err)
    });
  }

  viewBook(id: number): void {
    this.router.navigate(['/books', id]);
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book.id).subscribe({
      next: () => this.fetchBooks(),  // ✅ Refresh list after delete
      error: (err) => console.error('Failed to delete book:', err)
    });
  }

  get filteredBooks(): Book[] {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
