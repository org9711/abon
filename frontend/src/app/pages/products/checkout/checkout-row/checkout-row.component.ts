import { Component, OnInit, Input } from '@angular/core';

import { IOrder } from '../../../../models/order.model';


@Component({
  selector: 'checkout-row',
  templateUrl: './checkout-row.component.html',
  styleUrls: ['./checkout-row.component.css']
})
export class CheckoutRowComponent implements OnInit {

  @Input() order:IOrder;

  constructor() { }

  ngOnInit() {
  }

  totalPriceCalc() {
    return this.order.quantity * this.order.product.price;
  }

}
