import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class DrugCategoryService {
  httpOption

  constructor(private httpClient: HttpClient , private router: Router) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   }

  getAllCategories() {
    return this.httpClient.get<any>("http://localhost:5250/api/drug-categories");
  }

  getCategoryById(categoryId: number) {
    return this.httpClient.get<any>(`http://localhost:5250/api/drug-categories/${categoryId}`);
  }

  editCategory(categoryId: number , category: Icategory) {
    return this.httpClient.put<any>(`http://localhost:5250/api/drug-categories/${categoryId}` , category , this.httpOption);
  }

  addNewCategory(category : Icategory) {
    return this.httpClient.post<any>("http://localhost:5250/api/drug-categories" , category , this.httpOption);
  }

  deleteCategory(categoryId: number) {
    return this.httpClient.delete<any>(`http://localhost:5250/api/drug-categories/${categoryId}`);
  }
}
