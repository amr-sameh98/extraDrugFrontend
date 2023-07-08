import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class  authGuard implements CanActivate {
  constructor(private authService:UserAuthService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url: string = state.url;

    return this.checkLogin(url);

  }

  checkLogin(url: string): boolean  {

    if(this.authService.isUserLogged)
    {
      return true;
    }
    this.authService.redirectUrl = url ;

      alert ('You must login First...');
      this.router.navigate(['/login']);
      return false

  }


};





