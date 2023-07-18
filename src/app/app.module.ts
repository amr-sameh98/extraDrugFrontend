import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { RegisterComponent } from './components/register/register.component';
import { DrugFormComponent } from './components/drug-form/drug-form.component';

import { CoreModule } from './core/core.module';
import { TypeFormComponent } from './components/drug-type-form/type-form.component';
import { CategoryFormComponent } from './components/drug-category-form/category-form.component';
import { CompanyFormComponent } from './components/drug-company-form/company-form.component';
import { AlertMsgComponent } from './components/alert-msg/alert-msg.component';
import { TypesComponent } from './components/drug-types/types.component';
import { DrugCompanyComponent } from './components/drug-companies/drug-company.component';
import { DrugCategoriesComponent } from './components/drug-categories/drug-categories.component';
import { UpdateUserRoleComponent } from './components/update-user-role/update-user-role.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';

// import { AuthInterceptor } from './core/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DrugsComponent,
    RegisterComponent,
    DrugFormComponent,
    TypeFormComponent,
    CategoryFormComponent,
    CompanyFormComponent,
    AlertMsgComponent,
    FooterComponent,
    TypesComponent,
    DrugCompanyComponent,
    DrugCategoriesComponent
    ,UpdateUserRoleComponent, 
    UserProfileComponent,
    EditUserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,MatCardModule
    // AngularFontAwesomeModule
  ],
  providers: [] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
