/* import { Component, inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})

export class BookForm {
  private bookService = inject(BookService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // 👈 to read route params

  books: Book[] = [];
  title: string = '';
  author: string = '';
  genre?: string = '';
  yearPublished?: number;
  isEditMode: boolean = false;
  editingBookId?: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        // We're in edit mode
        this.isEditMode = true;
        this.editingBookId = +id;
        const bookToEdit = this.bookService.getBookById(+id); // You must create this function
        if (bookToEdit) {
          this.title = bookToEdit.title;
          this.author = bookToEdit.author;
          this.genre = bookToEdit.genre;
          this.yearPublished = bookToEdit.yearPublished;
        }
      }
    });
  }

  onSubmit() {
  if (!this.title || !this.author) {
    alert("Title and Author are required!");
    return;
  }

  const newBook: Book = {
    id: Date.now(),
    title: this.title,
    author: this.author,
    genre: this.genre || '',
    yearPublished:this.yearPublished

     
  };
  this.bookService.addBook(newBook);
  this.router.navigate(['/books'])
}
}
*/

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm {
  private bookService = inject(BookService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  title: string = '';
  author: string = '';
  genre?: string = '';
  yearPublished?: number;
  isEditMode: boolean = false;
  editingBookId?: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.isEditMode = true;
        this.editingBookId = +id;
        this.bookService.getBookById(+id).subscribe({
          next: (book: Book) => {
            this.title = book.title;
            this.author = book.author;
            this.genre = book.genre;
            this.yearPublished = book.yearPublished;
          },
          error: () => alert("Book not found")
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.title || !this.author) {
      alert("Title and Author are required!");
      return;
    }

    const book: Book = {
      id: this.editingBookId || 0,
      title: this.title,
      author: this.author,
      genre: this.genre || '',
      yearPublished: this.yearPublished
    };

    if (this.isEditMode && this.editingBookId) {
      // UPDATE
      this.bookService.updateBook(book).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Failed to update book')
      });
    } else {
      // ADD NEW
      this.bookService.addBook(book).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Failed to add book')
      });
    }
  }
}
