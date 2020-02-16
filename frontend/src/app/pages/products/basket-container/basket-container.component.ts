import { Component, OnInit } from '@angular/core';

import { IOrder } from '../../../models/order.model';
import { OrderService } from '../../../services/orders/order.service';
import { PopupService } from '../../../services/popup/popup.service';


@Component({
  selector: 'basket-container',
  templateUrl: './basket-container.component.html',
  styleUrls: ['./basket-container.component.css']
})
export class BasketContainerComponent implements OnInit {

    orders:IOrder[];
    initiationError:boolean = false;
    initiationErrors = [];
    popupVis = {};

    constructor(private orderService:OrderService,
      private popupService:PopupService) { }

    ngOnInit() {
      this.orderService.ordersObs
        .subscribe(res => {
          this.orders = res;
          this.calculateTotalPrice();
        });
      this.popupService.popupVisObs.subscribe(res => this.popupVis = res);
    }

    initiateOrder() {
      this.orderService.initiateOrder().subscribe(
        res => {
          this.popupVis["checkout"] = true;
          this.popupService.updatePopupVis(this.popupVis);
        },
        err => {
          this.initiationErrors = err.errors;
          this.initiationError = true;
        }
      );
    }

    private calculateTotalPrice() {
      let totalPrice = 0;
      for(let i = 0; i < this.orders.length; i++) {
        totalPrice += this.orders[i].quantity * this.orders[i].product.price;
      }
      return totalPrice;
    }

}
