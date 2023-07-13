import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { fa1 , fa2 , fa3 } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserLogged:boolean;

  // faPencil =faPencil
  fa1 = fa1
  fa2 = fa2
  fa3 = fa3

  constructor(private authService:UserAuthService ) {
    this.isUserLogged=this.authService.isUserLogged;
    console.log(this.isUserLogged);
   }

   ngOnInit(): void {
    // this.isUserLogged=this.authService.isUserLogged;
    this.authService.getloggedStatus().subscribe(status=>{
    this.isUserLogged=status;
    console.log(this.isUserLogged);
});
}

}
