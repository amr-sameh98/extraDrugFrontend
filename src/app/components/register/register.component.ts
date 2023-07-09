import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { existEmailValidator } from 'src/app/customValidators/ExistEmail.Validator';
import { passwordMatch } from 'src/app/customValidators/PasswordMatch.Validator';
import { Iuser } from 'src/app/models/iuser';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userRegFrm: FormGroup;
  isUserLogged: boolean = false;
  existUserEmails: string[]=[];
  ifError : boolean = false
  errorMessage: string = ''

  constructor(private fb: FormBuilder , private authService: UserAuthService , private router: Router) {
    this.isUserLogged= this.authService.isUserLogged;

    // this.existUserEmails=["aa@aa.com", "bb@bb.com", "dd@dd.com"];

    // ^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$

    this.userRegFrm = fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      username: ['', [Validators.required, Validators.pattern('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')]],
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ,existEmailValidator(this.existUserEmails)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required]],
    }, {validators: passwordMatch});


  }

  ngOnInit(): void {

  }

  get firstName() {
    return this.userRegFrm.get('firstName');
  }

  get lastName() {
    return this.userRegFrm.get('lastName');
  }

  get username() {
    return this.userRegFrm.get('username');
  }


  get email() {
    return this.userRegFrm.get('email');
  }

  get PhoneNumber() {
    return this.userRegFrm.get('PhoneNumber');
  }


  get password() {
    return this.userRegFrm.get('password');
  }

  get confirmPassword() {
    return this.userRegFrm.get('confirmPassword');
  }

  submit() {
    let userModel: Iuser = this.userRegFrm.value as Iuser;

    this.authService.register(userModel).subscribe(res => {
      console.log(res);
      let token = res.data.token ;
      let role = res.data.roles[0]
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      this.authService.isloggedSubject.next(true);
      this.isUserLogged= this.authService.isUserLogged;
      this.router.navigate([this.authService.redirectUrl])
      console.log("succes");
      history.pushState(null, '');
    } , err => {
      console.log(err);
      console.log(err.error.errors[0]);
      this.errorMessage = err.error.errors[0]
      this.ifError = true
    })
    // ammmmmm@ssss.com
    // Amr@@1998
  }
}
