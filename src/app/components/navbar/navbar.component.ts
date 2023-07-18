import { UserOperationsService } from 'src/app/services/user-operations.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogged:boolean;
  adminRole : any;
  userProfilePicture:string='';

  constructor(private authService:UserAuthService ,
    private userOperationsService:UserOperationsService,
     private router: Router) {
    this.isUserLogged=this.authService.isUserLogged;
    console.log(this.isUserLogged);

    if(localStorage.getItem("role") == "Admin") {
      this.adminRole = true
    }
    //console.log(this.isUserLogged);
   }

  ngOnInit(): void {
        // this.isUserLogged=this.authService.isUserLogged;



    this.authService.getloggedStatus().subscribe(status=>{
      this.isUserLogged=status;
      //this.userProfilePicture=environment.profilepic;
      //console.log(this.isUserLogged);
    });

    ///getting his profile picture
    this.userOperationsService.getUserprofile().subscribe({
      next:(res)=>{
      this.userProfilePicture=environment.baseURL+res.data.photo;
      
      }
    })

    if(localStorage.getItem("role") == "Admin") {
      this.adminRole = true
    }
    console.log("rolleee");

    console.log(this.adminRole);

  }

  logout()
  {
    this.authService.logout();
    this.isUserLogged= this.authService.isUserLogged;
  }
}
