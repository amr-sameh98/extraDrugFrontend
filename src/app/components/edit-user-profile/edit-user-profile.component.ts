import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ipassword } from 'src/app/models/ipssword';
import { Iuser } from 'src/app/models/iuser';
import { UserOperationsService } from 'src/app/services/user-operations.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit{
  userData = {} as Iuser;
  userProfilePicture:string=""
  userID:any
  passwordForm:FormGroup
  editDataForm:FormGroup
  constructor(
    private router:Router,
    private toastr:ToastrService,
    private userOperationsService:UserOperationsService,
    private fb: FormBuilder ,
    ){
      
      
      this.editDataForm = fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]]
        
      }, );
      this.passwordForm = fb.group({
        OldPassword: ['', [Validators.required]],
        NewPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        
      }, );
    }
    ngOnInit(): void {
  
      this.getUserprofile();
      
    }
    
    //Edit Password
  get OldPassword() {
    return this.passwordForm.get('OldPassword');
  }

  get NewPassword() {
    return this.passwordForm.get('NewPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
  //Edit profile
  get firstName() {
    return this.editDataForm.get('firstName');
  }

  get lastName() {
    return this.editDataForm.get('lastName');
  }

  get username() {
    return this.editDataForm.get('username');
  }
  get phoneNumber() {
    return this.editDataForm.get('phoneNumber');
  }

  getUserprofile(){
    this.userOperationsService.getUserprofile().subscribe({
    next:(data)=>{ 
      this.userData=data.data;
      this.userProfilePicture=environment.baseURL+data.data.photo;
      this.firstName?.setValue(this.userData.firstName);
      this.lastName?.setValue(this.userData.lastName);
      this.username?.setValue(this.userData.username);
      this.phoneNumber?.setValue(this.userData.phoneNumber);

      //console.log(this.userData);
    //console.log(this.userProfilePicture);
    //console.log(environment.profilepic);
    },error(err) {
    console.log(err)
    },
  
    })
  }
  submitPass(){

    let passModel:Ipassword=this.passwordForm.value as Ipassword; 
    
    console.log( passModel);
    //console.log(this.NewPassword?.value);

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
      },error:(error)=>{
      console.log(error?.error);
      this.toastr.error(`${error?.error?.message}`,"",{
        disableTimeOut:false,
        titleClass:"toaster_title",
        messageClass:"toaster_message",
        timeOut:5000,
        closeButton:true
      })
      }
    
      })
  }
  submitProfileData(){
    let profileModel:Iuser=this.editDataForm.value as Iuser;
    
    //console.log(this?.phoneNumber);
    console.log(profileModel);
    this.userOperationsService.editUserData(profileModel).subscribe({

      next:(data)=>{ 
        this.toastr.success(`${data.message}`,"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
        
      console.log(data);
      },error:(error)=>{
      console.log(error?.error);
      this.toastr.error(`${error?.error?.message}`,"",{
        disableTimeOut:false,
        titleClass:"toaster_title",
        messageClass:"toaster_message",
        timeOut:5000,
        closeButton:true
      })
      }

    });
  }

}
