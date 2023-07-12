import { DrugsService } from './../../services/drugs.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icompany } from 'src/app/models/icompany';
import { Idrug } from 'src/app/models/idrug';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {
  drugsList : Idrug[] = []
  // companiesList: { id: number , name: string }[] = []

    constructor(private httpClient : HttpClient , private router: Router , private activatedRoute: ActivatedRoute, private drugsService: DrugsService ) {

  }

  ngOnInit(): void {
    console.log("onInit");

    this.drugsService.getAllDrugs().subscribe((data) => {
      console.log(data);

      this.drugsList = data.data
    })

    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");

    // this.httpClient.get<any>("http://localhost:5250/api/drug-companies" ).subscribe(data => {
    //  console.log(data);
    //  this.companiesList = data.data

    // })

  }

  // getAllDrugs() {
  //   this.drugsService.getAllDrugs().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.drugsList = data.data
  //     }
  //   })
  // }

  // updateDrug(drugId : number , drug: Idrug) {
  //   this.drugsService.updateDrug(drugId , drug).subscribe({
  //     next: (data) => {

  //     }
  //   })
  // }

  // getAllCompanies() {
  //   return this.httpClient.get<any>("http://localhost:5250/api/drug-companies" ).subscribe(data => {
  //    console.log(data);
  //    this.companiesList = data.data

  //   })
  //  }

   AddNewDrug() {
    this.router.navigate(['/drugForm/0/edit'])
   }

   deleteDrug(drugId: any) {
    Swal.fire({
      title: 'Are you sure want to remove this drug ?',
      text: 'You will not be able to recover this drug!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.drugsService.deleteDrug(drugId).subscribe(() => {
          this.drugsList = this.drugsList.filter((drug : any) => drug.id != drugId)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })

   }


}
