import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Itype } from '../models/itype';

@Injectable({
  providedIn: 'root'
})
export class DrugTypeService implements OnInit {
  httpOption

  constructor(private httpClient: HttpClient , private router: Router) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   }
  ngOnInit(): void {

  }

  getAllTypes() {
    return this.httpClient.get<any>("http://localhost:5250/api/drug-types");
  }

  getTypeById(typeId: number) {
    return this.httpClient.get<any>(`http://localhost:5250/api/drug-types/${typeId}`);
  }

  editType(typeId: number , type: Itype) {
    return this.httpClient.put<any>(`http://localhost:5250/api/drug-types/${typeId}` , type , this.httpOption);
  }

  addNewType(type : Itype) {
    return this.httpClient.post<any>("http://localhost:5250/api/drug-types" , type , this.httpOption);
  }

  deleteType(typeId: number) {
    return this.httpClient.delete<any>(`http://localhost:5250/api/drug-types/${typeId}`);
  }
}
