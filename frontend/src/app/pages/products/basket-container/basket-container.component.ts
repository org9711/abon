import { Component, OnInit } from '@angular/core';

import { IOrder } from '../../../models/order.model';
import { OrderService } from '../../../services/orders/order.service';
import { PopupService } from '../../../services/popup/popup.service';
import { IPopupVis } from '../../../models/popupVis.model';


@Component({
  selector: 'basket-container',
  templateUrl: './basket-container.component.html',
  styleUrls: ['./basket-container.component.css']
})
export class BasketContainerComponent implements OnInit {

    orders:IOrder[];
    initiationError:boolean = false;
    initiationErrors = [];
    popupVis:IPopupVis;

    constructor(public orderService:OrderService,
      public popupService:PopupService) { }

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
          sessionStorage.setItem('orderToken', res.orderToken);
          this.popupVis["order_checkout"] = true;
          this.popupService.updatePopupVis(this.popupVis);
        },
        err => {
          this.initiationErrors = err.errors;
          this.initiationError = true;
        }
      );
    }

    public calculateTotalPrice() {
      let totalPrice = 0;
      for(let i = 0; i < this.orders.length; i++) {
        totalPrice += this.orders[i].quantity * this.orders[i].product.price;
      }
      return totalPrice;
    }

}
