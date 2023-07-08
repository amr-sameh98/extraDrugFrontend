import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements OnInit {
  private isloggedSubject: BehaviorSubject<boolean>;
  public redirectUrl: string = '';


  constructor(private location: Location , private router: Router) {
    this.isloggedSubject=new BehaviorSubject<boolean> (this.isUserLogged);
   }
  ngOnInit(): void {
    history.pushState(null, '');
  }

  login(userName: string, password: string)
  {
    // Call login API, and get Access Token
    let usrToken='123456789';
    localStorage.setItem("token", usrToken);
    this.isloggedSubject.next(true);
    history.pushState(null, '');
    this.router.navigate([this.redirectUrl])

    // this.location.replaceState('/')
  }

  logout()
  {
    localStorage.removeItem("token");
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
}
