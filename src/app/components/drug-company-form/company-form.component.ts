import { DrugCompanyService } from './../../services/drug-company.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icategory } from 'src/app/models/icategory';
import { Icompany } from 'src/app/models/icompany';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {
  companyForm: FormGroup;
  httpOption;
  companyId: any;
  company: any

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder , private router: Router , private httpClient : HttpClient , private drugCompanyService : DrugCompanyService) {
    this.companyForm = fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{3,}')]],
    }, );
    this.httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
   }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.companyId != 0) {
      this.drugCompanyService.getCompanyById(this.companyId).subscribe({
        next: (response) => {
          this.company = response.data;
          this.name?.setValue(this.company.name);
        },
      });
    }
  }

   get name() {
    return this.companyForm.get('name');
  }

  submit() {
    let companyModel: Icompany = this.companyForm.value as Icompany;

    if (this.companyForm.status == 'VALID') {
      if (this.companyId == 0) {
        this.drugCompanyService
          .addNewCompany(companyModel)
          .subscribe((data) => {console.log(data);
          });
      } else {
        this.drugCompanyService
          .editCompany(this.companyId, companyModel)
          .subscribe((data) => {console.log(data)});
      }
      this.router.navigate(['/drugCompanies']);
    }
  }

}
