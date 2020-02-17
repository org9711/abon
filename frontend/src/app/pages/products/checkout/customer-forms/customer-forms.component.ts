import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormValidationService } from '../../../../services/forms/form-validation.service';


@Component({
  selector: 'customer-forms',
  templateUrl: './customer-forms.component.html',
  styleUrls: ['./customer-forms.component.css']
})
export class CustomerFormsComponent implements OnInit {

  form:FormGroup;

  constructor(private formValidationService:FormValidationService) { }

  ngOnInit() {
    const firstname = new FormControl("", [Validators.required, Validators.pattern('[ A-Za-zÀ-ÖØ-öø-ÿ\-]*'), Validators.maxLength(30)]);
    const surname = new FormControl("", [Validators.required, Validators.pattern('[ A-Za-zÀ-ÖØ-öø-ÿ\-]*'), Validators.maxLength(30)]);
    const email = new FormControl("", [Validators.required, Validators.email, Validators.maxLength(100)]);

    const addrLine1 = new FormControl("", [Validators.required, Validators.pattern('[ 0-9A-Za-zÀ-ÖØ-öø-ÿ\-\'\,\.]*'), Validators.maxLength(50)]);
    const addrLine2 = new FormControl("", [Validators.pattern('[ 0-9A-Za-zÀ-ÖØ-öø-ÿ\-\'\,\.]*'), Validators.maxLength(50)]);
    const town = new FormControl("", [Validators.required, Validators.pattern('[ A-Za-zÀ-ÖØ-öø-ÿ\-\'\,\.]*'), Validators.maxLength(30)]);
    const county = new FormControl("", [Validators.pattern('[ a-zA-Z\-\'\,\.]*'), Validators.maxLength(30)]);
    const postcode = new FormControl("", [Validators.required, Validators.pattern('[ 0-9A-Za-z\-]*'), Validators.maxLength(20)]);

    this.form = new FormGroup({
      fname: firstname,
      sname: surname,
      email: email,

      addr1: addrLine1,
      addr2: addrLine2,
      town: town,
      county: county,
      postcode: postcode
    });
  }

}
