import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icategory } from 'src/app/models/icategory';
import { DrugCategoryService } from 'src/app/services/drug-category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  httpOption;
  categoryId: any;
  category: any

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder , private router: Router , private drugCategoryService : DrugCategoryService) {
    this.categoryForm = fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{3,}')]],
    }, );
    this.httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
   }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.categoryId != 0) {
      this.drugCategoryService.getCategoryById(this.categoryId).subscribe({
        next: (response) => {
          console.log(response);
          this.category = response.data;
          this.name?.setValue(this.category.name);
        },
      });
    }
  }

   get name() {
    return this.categoryForm.get('name');
  }

  submit() {
    let categoryModel: Icategory = this.categoryForm.value as Icategory;

    if (this.categoryForm.status == 'VALID') {
      if (this.categoryId == 0) {
        this.drugCategoryService
          .addNewCategory(categoryModel)
          .subscribe((data) => {console.log(data);
          });
      } else {
        this.drugCategoryService
          .editCategory(this.categoryId, categoryModel)
          .subscribe((data) => {console.log(data)});
      }
      this.router.navigate(['/drugCategories']);
    }
  }
}
