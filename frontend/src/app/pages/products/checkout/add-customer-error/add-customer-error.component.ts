import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add-customer-error',
  templateUrl: './add-customer-error.component.html',
  styleUrls: ['./add-customer-error.component.css']
})
export class AddCustomerErrorComponent implements OnInit {

  @Input() errors;
  errorMessages:string[] = [];

  constructor() { }

  ngOnInit() {
    for(let i = 0; i < this.errors.length; i++) {
      switch(this.errors[i].errorCode) {
        case "valuesWrong":
          this.errorMessages.push("There was some bad data entered. Please ammend the form and try again.");
          break;
        case "orderNull":
          this.errorMessages.push("You ran out of time submitting your order. Please close the checkout popup and try again.");
          break;
        case "tooFar":
          this.errorMessages.push("Unfortunately, we only deliver within " + this.errors[i].maxDistance +
            " miles of Castle Park and your address was calculated to be " + this.errors[i].actDistance.toFixed(1) +
            " miles away. It would be great if you could find a more local delivery point.");
          break;
        case "addressNotFound":
          this.errorMessages.push("We can't find your address. Please check over the address you've enetered and try again.")
      }
    }
  }

}
