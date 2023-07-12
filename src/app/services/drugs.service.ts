import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idrug } from '../models/idrug';

@Injectable({
  providedIn: 'root'
})
export class DrugsService implements OnInit {
  httpOption

  constructor(private httpClient: HttpClient , private router: Router) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,Authorization: 'my-auth-token'
      })
    };

   }
  ngOnInit(): void {

  }

  getAllDrugs() {
    return this.httpClient.get<any>("http://localhost:5250/api/drug");
  }

  getDrugByID(drugId: number) {
    return this.httpClient.get<any>(`http://localhost:5250/api/drug/${drugId}`);
  }

  editDrug(drugId: number , drug: Idrug) {
    return this.httpClient.put<any>(`http://localhost:5250/api/drug/${drugId}` , JSON.stringify(drug) , this.httpOption);
  }

  addNewDrug(newDrug : Idrug) {
    return this.httpClient.post<Idrug>("http://localhost:5250/api/drug", newDrug , this.httpOption);
  }

  deleteDrug(drugId: number) {
    return this.httpClient.delete<Idrug>(`http://localhost:5250/api/drug/${drugId}`, this.httpOption);
  }

}
