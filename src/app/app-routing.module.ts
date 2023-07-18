import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { authGuard } from './gaurds/auth.guard';
import { loginGuard } from './gaurds/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { DrugFormComponent } from './components/drug-form/drug-form.component';
import { TypeFormComponent } from './components/drug-type-form/type-form.component';
import { CategoryFormComponent } from './components/drug-category-form/category-form.component';
import { CompanyFormComponent } from './components/drug-company-form/company-form.component';
import { TypesComponent } from './components/drug-types/types.component';
import { DrugCompanyComponent } from './components/drug-companies/drug-company.component';
import { DrugCategoriesComponent } from './components/drug-categories/drug-categories.component';
import { UpdateUserRoleComponent } from './components/update-user-role/update-user-role.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';

const routes: Routes = [
  {path : '' , component: HomeComponent},
  {path : 'login' , component: LoginComponent , canActivate: [loginGuard]},
  {path : 'register' , component: RegisterComponent },
  {path : 'drugs' , component: DrugsComponent , canActivate: [authGuard]},
  {path : 'drugTypes' , component: TypesComponent , canActivate: [authGuard]},
  {path : 'drugCategories' , component: DrugCategoriesComponent , canActivate: [authGuard]},
  {path : 'drugCompanies' , component: DrugCompanyComponent , canActivate: [authGuard]},
  {path : 'drugForm/:id/edit', component: DrugFormComponent ,  canActivate: [authGuard] },
  {path : 'typeForm/:id/edit' , component: TypeFormComponent , canActivate: [authGuard]},
  {path : 'categoryForm/:id/edit' , component: CategoryFormComponent , canActivate: [authGuard]},
  {path : 'companyForm/:id/edit' , component: CompanyFormComponent , canActivate: [authGuard]},
  {path : 'userRole' , component: UpdateUserRoleComponent , canActivate: [authGuard]},
  {path : 'userProfile' , component: UserProfileComponent , canActivate: [authGuard]},
  {path : 'editProfile' , component: EditUserProfileComponent , canActivate: [authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
