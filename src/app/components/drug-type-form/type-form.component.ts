import { DrugTypeService } from './../../services/drug-type.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Itype } from 'src/app/models/itype';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent {
  typeForm: FormGroup;
  httpOption;
  typeId: any;
  type: any

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder , private router: Router , private httpClient : HttpClient , private drugTypeService : DrugTypeService) {
    this.typeForm = fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{3,}')]],
    }, );
    this.httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
   }

  ngOnInit(): void {
    this.typeId = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.typeId != 0) {
      this.drugTypeService.getTypeById(this.typeId).subscribe({
        next: (response) => {
          console.log(response);
          this.type = response.data;
          this.name?.setValue(this.type.name);
        },
      });
    }
  }

   get name() {
    return this.typeForm.get('name');
  }

  submit() {
    let typeModel: Itype = this.typeForm.value as Itype;

    if (this.typeForm.status == 'VALID') {
      if (this.typeId == 0) {
        this.drugTypeService
          .addNewType(typeModel)
          .subscribe((data) => {console.log(data);
          });
      } else {
        this.drugTypeService
          .editType(this.typeId, typeModel)
          .subscribe((data) => {console.log(data)});
      }
      this.router.navigate(['/drugTypes']);
    }
  }
}
