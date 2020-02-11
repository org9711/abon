import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../../services/orders/order.service';


@Component({
  selector: 'basket-container',
  templateUrl: './basket-container.component.html',
  styleUrls: ['./basket-container.component.css']
})
export class BasketContainerComponent implements OnInit {

    orders
    totalPrice

    constructor(private orderService:OrderService) { }

    ngOnInit() {
      this.orderService.ordersObs
        .subscribe(res => {
          this.orders = res
          this.calculateTotalPrice();
        });
    }

    private calculateTotalPrice() {
      let totalPrice = 0;
      for(let i = 0; i < this.orders.length; i++) {
        totalPrice += this.orders[i].totalPrice;
      }
      this.totalPrice = totalPrice;
    }

}
