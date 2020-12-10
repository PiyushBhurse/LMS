import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Books } from '../models/Books';
import { Category } from '../models/Category';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  str: string;

  constructor(public httpClient: HttpClient) { }
  userUrl: string = "http://localhost:3000/users";
  booksUrl: string = "http://localhost:3000/books";
  categoryUrl: string = "http://localhost:3000/categories";

  getAllUsers() {
    return this.httpClient.get<User[]>(this.userUrl+"?role=member");
  }
  getAllUsersWithLibrarian() {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  getUser(id: string) {
    return this.httpClient.get<User>(this.userUrl + "/" + id);
  }

  addUser(user: User) {
    return this.httpClient.post(this.userUrl, user);
  }

  getAllBooks() {
    return this.httpClient.get<Books[]>(this.booksUrl);
  }

  getBooksByCategory(category: string) {
    return this.httpClient.get<Books[]>(this.booksUrl + "?category=" + category);
  }

  getCategories() {
    return this.httpClient.get<Category[]>(this.categoryUrl);
  }
  getCategoryByValue(value: string) {
    return this.httpClient.get<Category>(this.categoryUrl + "?q=" + value);
  }
  updateBookStatus(book: Books) {
    return this.httpClient.put(this.booksUrl + "/" + book.id, book);
  }
  getBooksBySearchText(searchText: string) {
    return this.httpClient.get<Books[]>(this.booksUrl + "?q=" + searchText);
  }
  getBooksByIssuedUser(userId: number) {
    return this.httpClient.get<Books[]>(this.booksUrl + "?issuedTo=" + userId);
  }

}
