import { UserOperationsService } from './../../services/user-operations.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  formData : any;
  userNewImage : any
  //@ViewChild('imageForUserProfile') img : any;

  
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

    //let PhotoFile:File =event.target.files[0];
    //this.selecetdFile=event.target.files[0];
    this.fileName = event?.target.files[0].name;
    //Creating img
    if (event.target.files && event.target.files[0]) {
    
    //image to show on upload
    // let img = event.target.files[0];
    // this.userNewImage = URL.createObjectURL(img)
    // this.img.nativeElement.style.display = "block"
    // const reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);

    //set image model
    let files = event.srcElement.files
    console.log(files)

    if (!files) {
      return
    }
     this.formData = new FormData();
    for (let i = 0; i <= files.length; i++) {
      this.formData.append("file", files[i] );
    }
    console.log(this.formData);

  }

    //console.log(this.fileName);
    //console.log(PhotoFile);
    

  }
  OnUploadFile(){
    //console.log(this.selecetdFile)
    this.userOperationsService.uploadUserPhoto(this.formData).subscribe({
      next:(data)=>{
        this.fileName='';
        this.toastr.success(`${data.message}`,"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
        this.getUserprofile()
        //this.router.navigate(['/userProfile'])
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
