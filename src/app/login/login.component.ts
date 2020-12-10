import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ApiService } from '../utils/api.service';
import { HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../utils/GlobalConstants';

export class Login {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signup: boolean = false;
  login: boolean = true;
  model = new User();
  model2 = new Login();
  invalidcred: boolean = false;
  users: User[];
  loggedUser: User;
  success: boolean = false;

  constructor(private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.getlatestUser();
  }

  onSubmit(form) {
    this.model.role = 'member';
    this.api.addUser(this.model).subscribe((response) => {
      console.log("user added now navigating");
    });
    form.resetForm();
    this.getlatestUser();
    this.login = true;
    this.signup = false;
    this.success = true;
  }

  getlatestUser() {
    this.api.getAllUsersWithLibrarian().subscribe((response) => {
      this.users = response;
      console.log("45: Total Existing Users count: " + this.users.length);
    });
  }



  onLogin(form2) {
    this.success = false;
    console.log(form2.value);
    let userFoundFlag: boolean = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == this.model2.username && this.users[i].password == this.model2.password) {
        console.log("57: user found " + this.users[i].id + " redirecting to home");
        sessionStorage.setItem('loggedUserId', this.users[i].id + "");
        sessionStorage.setItem("userRole", this.users[i].role);
        userFoundFlag = true;
      }
    }
    if (userFoundFlag) {
      this.router.navigate(['home']);
    } else {
      console.log("63: user not found showing invalid creds");
      this.invalidcred = true;
      form2.resetForm();
      this.router.navigate(['']);
      return;
    }
  }

  onClick() {
    console.log("here");
    this.router.navigate(['']);
  }

  toggleForms() {
    this.login = !this.login;
    this.signup = !this.signup;
  }
}
