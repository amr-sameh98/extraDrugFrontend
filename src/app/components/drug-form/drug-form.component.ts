import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
  styleUrls: ['./drug-form.component.css']
})
export class DrugFormComponent {
  drugForm: FormGroup;

  constructor(private fb: FormBuilder , private authService: UserAuthService , private router: Router) {
    this.drugForm = fb.group({
      arabicName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      englishName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      parcode: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      purpose: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}') ]]
    }, );
   }

   get arabicName() {
    return this.drugForm.get('arabicName');
  }

  get englishName() {
    return this.drugForm.get('englishName');
  }

  get parcode() {
    return this.drugForm.get('parcode');
  }

  get purpose() {
    return this.drugForm.get('purpose');
  }

  submit() {

  }

}
