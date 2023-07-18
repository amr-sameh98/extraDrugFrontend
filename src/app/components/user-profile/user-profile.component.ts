import { UserOperationsService } from './../../services/user-operations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/models/iuser';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData = {} as Iuser;
  userProfilePicture:string="";
  
  fileName: string='';
  selecetdFile : any;
  
  constructor(
    private router:Router,
    private toastr:ToastrService,
    private userOperationsService:UserOperationsService,
    ) {

         
  }
  ngOnInit(): void {
  
    this.getUserprofile();
    
  }
  editUserData(){
   
      this.router.navigate(['/editProfile'])
     
  }
  onFileUpload(event:any){

    let PhotoFile:File =event.target.files[0];
    this.selecetdFile=event.target.files[0];
    this.fileName = PhotoFile.name;
    console.log(this.fileName);
    console.log(PhotoFile);
    

  }
  OnUploadFile(){
    console.log(this.selecetdFile)
    this.userOperationsService.uploadUserPhoto(this.selecetdFile).subscribe({
      next:(data)=>{ 
        this.toastr.success(`${data.message}`,"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
        
      //console.log(data);
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
  showPicture(){
  //show user picture    
  }
  

  getUserprofile(){
    this.userOperationsService.getUserprofile().subscribe({
    next:(data)=>{ 
      this.userData=data.data;
      this.userProfilePicture=environment.baseURL+data.data.photo;
      

    //console.log(this.userData);
    //console.log(this.userProfilePicture);
    //console.log(environment.profilepic);
    },error(err) {
    console.log(err)
    },
  
    })
  }
  
  

}
