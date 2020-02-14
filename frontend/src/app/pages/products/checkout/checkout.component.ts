import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators'

import { OrderService } from '../../../services/orders/order.service';


@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orders;

  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.orderService.ordersObs.pipe(take(1)).subscribe(res => this.orders = res)
  }

  private calculateTotalPrice() {
    let totalPrice = 0;
    for(let i = 0; i < this.orders.length; i++) {
      totalPrice += this.orders[i].quantity * this.orders[i].product.price;
    }
    return totalPrice;
  }

}
