import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Icompany } from '../models/icompany';

@Injectable({
  providedIn: 'root'
})
export class DrugCompanyService {
  httpOption

  constructor(private httpClient: HttpClient , private router: Router) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   }

  getAllCompanies() {
    return this.httpClient.get<any>("http://localhost:5250/api/drug-companies");
  }

  getCompanyById(companyId: number) {
    return this.httpClient.get<any>(`http://localhost:5250/api/drug-companies/${companyId}`);
  }

  editCompany(companyId: number , company: Icompany) {
    return this.httpClient.put<any>(`http://localhost:5250/api/drug-companies/${companyId}` , company , this.httpOption);
  }

  addNewCompany(company : Icompany) {
    return this.httpClient.post<any>("http://localhost:5250/api/drug-companies" , company , this.httpOption);
  }

  deleteCompany(companyId: number) {
    return this.httpClient.delete<any>(`http://localhost:5250/api/drug-companies/${companyId}`);
  }
}
