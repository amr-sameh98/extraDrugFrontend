import { UserOperationsService } from './../../services/user-operations.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/models/iuser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ipassword } from 'src/app/models/ipssword';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
   userData = {} as Iuser;
  userID:any
  passwordForm:FormGroup
  constructor(private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private userOperationsService:UserOperationsService,
    private fb: FormBuilder ,
    ) {
      this.passwordForm = fb.group({
        OldPassword: ['', [Validators.required]],
        NewPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        
      }, );
         
  }
  ngOnInit(): void {
  
    this.getUserprofile();
    
  }
  //OldPassword:string;
    //NewPassword:string
  get OldPassword() {
    return this.passwordForm.get('OldPassword');
  }

  get NewPassword() {
    return this.passwordForm.get('NewPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
  getUserprofile(){
    this.userOperationsService.getUserprofile().subscribe({
    next:(data)=>{ this.userData=data.data;
    //console.log(this.userData);
    },error(err) {
    console.log(err)
    },
  
    })
  }
  submit(){

    let passModel:Ipassword=this.passwordForm.value as Ipassword; 
    
    console.log( passModel);
    console.log(this.NewPassword?.value);

    this.userOperationsService.changePassword(passModel).subscribe({
      next:(data)=>{ 
        this.toastr.success(`${data.message}`,"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
        
      console.log(data);
      },error:(err)=>{
      console.log(err.message);
      this.toastr.error(`${err.message}`,"",{
        disableTimeOut:false,
        titleClass:"toaster_title",
        messageClass:"toaster_message",
        timeOut:5000,
        closeButton:true
      })
      },
    
      })
  }

}
