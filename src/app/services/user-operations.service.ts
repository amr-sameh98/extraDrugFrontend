import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ipassword } from '../models/ipssword';
import { environment } from 'src/environments/environment.development';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserOperationsService {
  httpOption
  constructor(private httpClient: HttpClient , private router: Router) { 
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  
  getAllUsers() {
    return this.httpClient.get<any>(`${environment.baseURL}/api/user`);//All users
  }

  getUserById(userId: string) {
    return this.httpClient.get<any>(`${environment.baseURL}/api/user/${userId}`);
  }
  deleteDrugFromUser(userDrugId: string) {
    return this.httpClient.delete<any>(`${environment.baseURL}/api/user/drugs/${userDrugId}`);
  }

  getUserprofile() {
    return this.httpClient.get<any>(`${environment.baseURL}/api/user/profile`);
  }
  changePassword(newpass: Ipassword) {
    return this.httpClient.patch<any>(`${environment.baseURL}/api/user/change-password`, newpass , this.httpOption);
  }

  editUserData(newData: Iuser) {
    return this.httpClient.put<any>(`${environment.baseURL}/api/user`, newData , this.httpOption);
  }
  uploadUserPhoto(photo: File) {
    return this.httpClient.patch<any>(`${environment.baseURL}/api/user/photo`, photo );
  }





}
