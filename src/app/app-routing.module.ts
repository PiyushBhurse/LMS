import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookListComponent } from './book-list/book-list.component'

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books/:searchParam/:searchBy', component: BookListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
