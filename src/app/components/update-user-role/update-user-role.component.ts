import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/models/iuser';
import { UserOperationsService } from 'src/app/services/user-operations.service';
import { FormBuilder,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-user-role',
  templateUrl: './update-user-role.component.html',
  styleUrls: ['./update-user-role.component.css']
})
export class UpdateUserRoleComponent implements OnInit {
  usersList : Iuser[] = []
  constructor(
    private userAuthService: UserAuthService,
    private toastr:ToastrService,
    private userOperationsService: UserOperationsService
    ) {
    
    
  }
  ngOnInit(): void {
    this.getAllusers();
  }
  getAllusers(){
    this.userOperationsService.getAllUsers().subscribe({
    next:(data) => {
      this.usersList = data.data
      //console.log(this.usersList);
    },
    error(err){console.log(err)}
  })
}
  updateRole(roleToAdd:string,roleToRemove:string,userid:string){
    
    this.userAuthService.addRole(userid,roleToAdd).subscribe({
      next:(res)=>{
        //if role was added successfully then the old role is removed
        //show a toster to confirm changes
        console.log(res);
        this.userAuthService.removeRole(userid,roleToRemove).subscribe({
          next:(x)=>{console.log(x);
            this.toastr.success(`${res.message}`,"",{
              disableTimeOut:false,
              titleClass:"toaster_title",
              messageClass:"toaster_message",
              timeOut:5000,
              closeButton:true
            })
          this.getAllusers();
          }
          ,error:(y)=>{console.log(y);
            this.toastr.success(`${y.message}`,"",{
              disableTimeOut:false,
              titleClass:"toaster_title",
              messageClass:"toaster_message",
              timeOut:5000,
              closeButton:true
            })
          }
        });
      }
        ,error:(y)=>{console.log(y);
          this.toastr.success(`${y.message}`,"",{
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
