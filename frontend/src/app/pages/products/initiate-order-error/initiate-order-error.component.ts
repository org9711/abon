import { Component, OnInit, Input } from '@angular/core';

import { IOrder } from '../../../models/order.model';
import { IInitiateError } from '../../../models/initiateError.model';


@Component({
  selector: 'initiate-order-error',
  templateUrl: './initiate-order-error.component.html',
  styleUrls: ['./initiate-order-error.component.css']
})
export class InitiateOrderErrorComponent implements OnInit {

  @Input() errors:IInitiateError[];
  @Input() orders:IOrder[];
  errorMessages:string[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      window.location.reload();
    }, 10000);
    this.produceErrorMessages();
  }

  public produceErrorMessages() {
    for(let i = 0; i < this.errors.length; i++) {
      let productName = "";
      for(let j = 0; j < this.orders.length; j++) {
        if(this.errors[i].productId == this.orders[j].product._id) {
          productName = this.orders[j].product.name;
        }
      }
      switch(this.errors[i].errorCode) {
        case "valuesWrong":
          this.errorMessages.push(productName + " had some bad data entered with it.");
        case "productNull":
          this.errorMessages.push(productName + " has been moved in or removed from our database.");
          break;
        case "priceNEqual":
          this.errorMessages.push(productName + " has changed price.");
          break;
        case "quantityMTstock":
          this.errorMessages.push(productName + " has lower stock than the quantity of your order.");
          break;
      }
    }
  }

}
