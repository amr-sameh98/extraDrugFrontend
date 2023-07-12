import { DrugsService } from './../../services/drugs.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Idrug } from 'src/app/models/idrug';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
  styleUrls: ['./drug-form.component.css']
})
export class DrugFormComponent implements OnInit {
  effectiveMaterialElement: string = '';
  //this array is for a specific drug
  effectiveMaterialElements: { id?: number , name: string }[] = [];
  drugForm: FormGroup;
  companiesList: { id: number , name: string }[] = []
  typesList: { id: number , name: string }[] = []
  categoriesList: { id: number , name: string }[] = []
  //this array is for a all drugs effective Materials
  effectiveMatrialsList: { id?: number , name: string }[] = []
  httpOption;
  token: any
  drugId: any;
  drug: any


// ^[ء-ي]+$


  constructor(private fb: FormBuilder ,
    private authService: UserAuthService ,
    private router: Router ,
    private httpClient : HttpClient ,
    private activatedRoute: ActivatedRoute,
    private drugsService: DrugsService) {
    this.drugForm = fb.group({
      ar_Name: ['', [Validators.required, Validators.pattern('[[ء-ي0-9 ]{3,}')]],
      en_Name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{3,}')]],
      parcode: ['', [Validators.required, Validators.pattern('[1-9]{3,}')]],
      purpose: ['', [Validators.required, Validators.pattern('[A-Za-z0-9ء-ي ]{3,}') ]],
      isTradingPermitted: [true],
      companyId: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      effectiveMatrials: [''],
    }, );
    this.token = localStorage.getItem('token');
    this.httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
        //  'Authorization':  `Bearer ${this.token}`
      })
    };
   }

  ngOnInit(): void {



    this.drugId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.drugId);

    if (this.drugId != 0) {
      this.drugsService.getDrugByID(this.drugId).subscribe({
        next: (response) => {
          console.log(response);

          this.drug = response.data;
          this.ar_Name?.setValue(this.drug.ar_Name);
          this.en_Name?.setValue(this.drug.en_Name);
          this.parcode?.setValue(this.drug.parcode);
          this.purpose?.setValue(this.drug.purpose);
          this.companyId?.setValue(this.drug.companyId);
          this.typeId?.setValue(this.drug.typeId);
          this.categoryId?.setValue(this.drug.categoryId);
          this.effectiveMatrials?.setValue(this.drug.effectiveMatrials);

        },
      });
    }



    this.getAllCompanies()
    this.getAllTypes()
    this.getAllCategories()
    this.getAllEffectiveMatrials()


  }

   get ar_Name() {
    return this.drugForm.get('ar_Name');
  }

  get en_Name() {
    return this.drugForm.get('en_Name');
  }

  get parcode() {
    return this.drugForm.get('parcode');
  }

  get purpose() {
    return this.drugForm.get('purpose');
  }

  get companyId() {
    return this.drugForm.get('companyId');
  }

  get typeId() {
    return this.drugForm.get('typeId');
  }

  get categoryId() {
    return this.drugForm.get('categoryId');
  }
  get effectiveMatrials() {
    return this.drugForm.get('effectiveMatrials');
  }

  getAllCompanies() {
   return this.httpClient.get<any>("http://localhost:5250/api/drug-companies" ).subscribe(data => {
    // console.log(data);
    this.companiesList = data.data
   })
  }

  getAllTypes() {
    return this.httpClient.get<any>("http://localhost:5250/api/drug-types" ).subscribe(data => {
    //  console.log(data);
     this.typesList = data.data
    })
   }

   getAllCategories() {
    return this.httpClient.get<any>("http://localhost:5250/api/drug-categories" ).subscribe(data => {
    //  console.log(data);
     this.categoriesList = data.data
    })
   }

   getAllEffectiveMatrials() {
    return this.httpClient.get<any>("http://localhost:5250/api/effective-matrials").subscribe(data => {
      this.effectiveMatrialsList = data.data;

      this.effectiveMatrialsList =[{id:1,name:'dddd'}]
    })
   }

   addEffectiveMaterial(elementname:any){
    if (elementname!=='') {
      let index=this.effectiveMatrialsList.findIndex((oldelement)=>oldelement.name==elementname);
  if (index==-1) {
  this.effectiveMaterialElements.push({"name":elementname});
  }else{
  this.effectiveMaterialElements.push(this.effectiveMatrialsList[index]);
  }
   this.effectiveMaterialElement='';
    }
  console.log(this.effectiveMaterialElements);
  }
  removeeffectiveMaterial(element:any){
    this.effectiveMaterialElements=this.effectiveMaterialElements.filter((x)=>x.name!=element.name);
    console.log(this.effectiveMaterialElements);
    
  }

  submit() {
    let drugModel: Idrug = this.drugForm.value as Idrug;
    drugModel.companyId = Number(this.companyId?.value)
    drugModel.typeId = Number(this.typeId?.value)
    drugModel.categoryId = Number(this.categoryId?.value)
    drugModel.effectiveMatrials = this.effectiveMaterialElements

    if (this.drugForm.status == 'VALID') {
      if (this.drugId == 0) {
        this.drugsService
          .addNewDrug(this.drugForm.value)
          .subscribe((data) => {console.log(data);
          });
      } else {
        this.drugsService
          .editDrug(this.drugId, this.drugForm.value)
          .subscribe((data) => {console.log(data)});
      }
      this.router.navigate(['/drugs']);
    }
  }
}
