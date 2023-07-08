import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { authGuard } from './gaurds/auth.guard';
import { loginGuard } from './gaurds/login.guard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path : '' , component: HomeComponent},
  {path : 'login' , component: LoginComponent , canActivate: [loginGuard]},
  {path : 'register' , component: RegisterComponent },
  {path : 'drugs' , component: DrugsComponent , canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
