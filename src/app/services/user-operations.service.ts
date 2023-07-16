import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ipassword } from '../models/ipssword';

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
    return this.httpClient.get<any>("http://localhost:5250/api/user");//All users
  }

  getUserById(userId: string) {
    return this.httpClient.get<any>(`http://localhost:5250/api/user/${userId}`);
  }
  deleteDrugFromUser(userDrugId: string) {
    return this.httpClient.delete<any>(`http://localhost:5250/api/user/drugs/${userDrugId}`);
  }

  getUserprofile() {
    return this.httpClient.get<any>(`http://localhost:5250/api/user/profile`);
  }
  changePassword(newpass: Ipassword) {
    return this.httpClient.patch<any>("http://localhost:5250/api/user/change-password", newpass , this.httpOption);
  }






}
