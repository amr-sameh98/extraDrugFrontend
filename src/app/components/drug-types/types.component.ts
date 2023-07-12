import { DrugTypeService } from './../../services/drug-type.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Itype } from 'src/app/models/itype';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {
  typesList : Itype[] = []

  constructor(private router: Router , private drugTypeService: DrugTypeService ) {}

  ngOnInit(): void {
    console.log("onInit");

    this.drugTypeService.getAllTypes().subscribe({
      next: (data) => {
        this.typesList = data.data
      }
    })

    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
  }

   deleteType(typeId: any) {
    Swal.fire({
      title: 'Are you sure want to remove this drug type ?',
      text: 'You will not be able to recover this drug type!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your drug type has been deleted.',
          'success'
        )
        this.drugTypeService.deleteType(typeId).subscribe(() => {
          this.typesList = this.typesList.filter((type : any) => type.id != typeId)
        })
      }
    })

   }

}
