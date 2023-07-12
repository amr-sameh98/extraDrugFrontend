import { DrugCategoryService } from './../../services/drug-category.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Icategory } from 'src/app/models/icategory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drug-categories',
  templateUrl: './drug-categories.component.html',
  styleUrls: ['./drug-categories.component.css']
})
export class DrugCategoriesComponent {
  categoriesList : Icategory[] = []

  constructor(private router: Router , private drugCategoryService: DrugCategoryService ) {}

  ngOnInit(): void {
    console.log("onInit");
    this.drugCategoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categoriesList = data.data
      }
    })
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
  }

   deleteCategory(categoryId: any) {
    Swal.fire({
      title: 'Are you sure want to remove this drug category ?',
      text: 'You will not be able to recover this drug category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your drug category has been deleted.',
          'success'
        )
        this.drugCategoryService.deleteCategory(categoryId).subscribe(() => {
          this.categoriesList = this.categoriesList.filter((category : any) => category.id != categoryId)
        })
      }
    })

   }

}
