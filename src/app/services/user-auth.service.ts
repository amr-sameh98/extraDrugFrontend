import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { Iuser } from '../models/iuser';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements OnInit {
   isloggedSubject: BehaviorSubject<boolean>;
  public redirectUrl: string = '';
  httpOption

  constructor(private location: Location , private router: Router , private httpClient: HttpClient) {
    this.isloggedSubject=new BehaviorSubject<boolean> (this.isUserLogged);
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,Authorization: 'my-auth-token'
      })
    };
   }
  ngOnInit(): void {
    history.pushState(null, '');
  }

  login(email: string, password: string)//http://localhost:5250/api/auth/add-role-to-user
  {
    // Call login API, and get Access Token
    return this.httpClient
    .post<any>("http://localhost:5250/api/auth/admin/login",{email: `${email}` , password: `${password}`} , this.httpOption);
  }

  register(user: Iuser)
  {
    // Call login API, and get Access Token
    return this.httpClient
    .post<any>("http://localhost:5250/api/auth/register", JSON.stringify(user) , this.httpOption);
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.isloggedSubject.next(false);
    this.router.navigate(['']);
  }

  get isUserLogged(): boolean
  {
    return  (localStorage.getItem('token'))? true: false
  }

  getloggedStatus(): Observable<boolean>
  {
    return this.isloggedSubject.asObservable();
  }
  addRole(userId: string, role: string)// "User","Admin"
  {
    // Call add role API, and adding role
    return this.httpClient
    .post<any>("http://localhost:5250/api/auth/add-role-to-user",{userId: `${userId}` , role: `${role}`} , this.httpOption);
  }
  removeRole(userId: string, role: string)// "User","Admin"
  {
    // Call remove role API, and removing role
    return this.httpClient
    .post<any>("http://localhost:5250/api/auth/remove-role-from-user",{userId: `${userId}` , role: `${role}`} , this.httpOption);
  }

  // private handleError(error: HttpErrorResponse) {
  //   // Generic Error handler
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Write error details in Generic error log

  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     ()=>new Error('Error occured, please try again')
  //   )
  // }
}
