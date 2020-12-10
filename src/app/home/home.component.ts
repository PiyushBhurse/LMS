import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { ApiService } from '../utils/api.service';
import { GlobalConstants } from '../utils/GlobalConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: any;
  loggedUser: User;
  catagories: Category[];
  userList: User[];
  searchText = '';
  showLibraryFunctions: boolean;
  constructor(private router: Router, private api: ApiService) { }
  fetchEvent() {
    this.checkLogin();
    this.searchText = '';
    this.userId = sessionStorage.getItem('loggedUserId')
    this.api.getUser(this.userId).subscribe((res) => {
      this.loggedUser = res;
    });
    this.getCategories();
    this.loadUsers();
  }
  ngOnInit(): void {
    this.fetchEvent();
    this.showLibraryFunctions = GlobalConstants.showLibrarireanFunc();
  }
  checkLogin() {
    GlobalConstants.getLoggedUser() == 0 ? this.router.navigate(['']) : '';
  }
  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.catagories = res;
    });
  }
  showCategoriesBook(value) {
    this.router.navigate(['books', value, "category"]);
  }
  searchBooks() {
    this.router.navigate(['books', this.searchText, "search"]);
  }
  searchBooksIssuedToUser(user: User) {
    // console.log(user.id);
    this.router.navigate(['books', user.id, "userIssued"]);
  }
  loadUsers() {
    this.api.getAllUsers().subscribe(res => {
      this.userList = res;
      console.log(this.userList)
    })
  }
}
