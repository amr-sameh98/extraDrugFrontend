import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogged:boolean;
  constructor(private authService:UserAuthService , private router: Router) {
    this.isUserLogged=this.authService.isUserLogged;
    //console.log(this.isUserLogged);
   }

  ngOnInit(): void {
        // this.isUserLogged=this.authService.isUserLogged;
    this.authService.getloggedStatus().subscribe(status=>{
      this.isUserLogged=status;
      //console.log(this.isUserLogged);
    });
  }

  logout()
  {
    this.authService.logout();
    this.isUserLogged= this.authService.isUserLogged;
  }
}
