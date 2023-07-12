import { DrugCompanyService } from '../../services/drug-company.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Icompany } from 'src/app/models/icompany';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drug-company',
  templateUrl: './drug-company.component.html',
  styleUrls: ['./drug-company.component.css']
})
export class DrugCompanyComponent {
  companiesList : Icompany[] = []

  constructor(private router: Router , private drugCompanyService: DrugCompanyService ) {}

  ngOnInit(): void {
    console.log("onInit");

    this.drugCompanyService.getAllCompanies().subscribe({
      next: (data) => {
        this.companiesList = data.data
      }
    })

    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
  }

   deleteCompany(companyId: any) {
    Swal.fire({
      title: 'Are you sure want to remove this drug company ?',
      text: 'You will not be able to recover this drug company!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your drug company has been deleted.',
          'success'
        )
        this.drugCompanyService.deleteCompany(companyId).subscribe(() => {
          this.companiesList = this.companiesList.filter((type : any) => type.id != companyId)
        })
      }
    })

   }
}
