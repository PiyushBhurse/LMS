import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Books } from '../models/Books';
import { Category } from '../models/Category';
import { ApiService } from '../utils/api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/User';
import { GlobalConstants } from '../utils/GlobalConstants';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  searchParam: string;
  filteredBooks: Books[];
  category: Category;
  title = 'Search results';
  selectedBook: Books;
  selectedUser: any = 0;
  received: any = false;
  issuedUser: User = new User();
  users: User[];
  searchBy: string;
  showLibraryFunctions: boolean;
  // currentUser: User;
  constructor(private route: ActivatedRoute, private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.searchParam = this.route.snapshot.paramMap.get('searchParam');
    this.searchBy = this.route.snapshot.paramMap.get('searchBy');
    this.showLibraryFunctions = GlobalConstants.showLibrarireanFunc();
    this.loadUsers();
    if (this.searchBy == "category") {
      this.getTitle(this.searchParam);
      this.getBookList(this.searchParam);
    } else if (this.searchBy == "userIssued") {
      this.getBooksByIssuedUser(+this.searchParam);
    } else {
      this.getBooksBySearchTxt(this.searchParam);
    }

  }

  getTitle(categoryValue: string) {
    this.api.getCategoryByValue(categoryValue).subscribe(res => {
      this.category = res[0];
      this.title = this.category.lable;
    })
  }

  getBookList(categoryValue: string) {
    this.api.getBooksByCategory(categoryValue).subscribe(res => {
      this.filteredBooks = res;
    });
  }
  
  loadUsers() {
    this.api.getAllUsers().subscribe(res => {
      this.users = res;
    })
  }
  
  getBooksBySearchTxt(searchParam: string) {
    this.api.getBooksBySearchText(searchParam).subscribe(res => {
      this.filteredBooks = res;
    });
  }
  
  getBooksByIssuedUser(userId: number) {
    this.api.getBooksByIssuedUser(userId).subscribe(res => {
      this.filteredBooks = res;
    });
  }
  // --------------------------------------------------

  open(content, id) {
    this.modalService.open(content);
    this.getBookById(id);

  }

  getBookById(id: number) {
    this.selectedBook = this.filteredBooks.find(book => book.id === id);
    if (this.selectedBook.issued) {
      this.issuedUser = this.users.find(usr => usr.id == this.selectedBook.issuedTo);
    } else {
      this.issuedUser = new User();
    }
  }
  issueBook() {
    if ((GlobalConstants.showLibrarireanFunc() && this.selectedUser != 0) || !GlobalConstants.showLibrarireanFunc()) {
      this.selectedBook.issuedTo = !GlobalConstants.showLibrarireanFunc() ? GlobalConstants.getLoggedUser() : this.selectedUser;
      this.selectedBook.issuedOn = new Date();
      this.selectedBook.issued = true;
      this.api.updateBookStatus(this.selectedBook).subscribe(() => {
        console.log("Book Issued");
      });
    }
  }
  releaseBook() {
    if (this.received) {
      this.selectedBook.issuedTo = 0;
      this.selectedBook.issuedOn = null;
      this.selectedBook.issued = false;
      this.api.updateBookStatus(this.selectedBook).subscribe(() => {
        console.log("Book Released");
      });
    }
  }
}
