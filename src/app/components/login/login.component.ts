import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/iuser';
import { UserAuthService } from 'src/app/services/user-auth.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLoginForm: FormGroup;
  isUserLogged: boolean=false;


  constructor(private fb: FormBuilder , private authService: UserAuthService , private router: Router , private location:Location) {
    this.userLoginForm = fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$') ]],
      password: ['', [Validators.required]],
    },);

  }

  ngOnInit(): void {
    this.isUserLogged= this.authService.isUserLogged;
  }

  get username() {
    return this.userLoginForm.get('username');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  login()
  {
    this.authService.login(this.username?.value , this.password?.value);
    this.isUserLogged= this.authService.isUserLogged;
    // this.router.navigate([''], {replaceUrl: true});
    // history.pushState(null, '');
    // this.location.back();
    // this.location.historyGo(-2);
    // console.log(this.location.getState());

    // this.router.navigate(['']);
  }

  // logout()
  // {
  //   this.authService.logout();
  //   this.isUserLogged= this.authService.isUserLogged;
  // }
}
