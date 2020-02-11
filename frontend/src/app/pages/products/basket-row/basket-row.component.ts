import { Component, OnInit, Input } from '@angular/core';

import { IOrder } from '../../../models/order.model';
import { OrderService } from '../../../services/orders/order.service';


@Component({
  selector: 'basket-row',
  templateUrl: './basket-row.component.html',
  styleUrls: ['./basket-row.component.css']
})
export class BasketRowComponent implements OnInit {

  @Input() order:IOrder;

  constructor(private orderService:OrderService) { }

  ngOnInit() {
  }

  incrementClick() {
    this.orderService.incrementOrder(this.order.productId, this.order.productName, this.order.productPrice, this.order.productStock);
  }

  decrementClick() {
    this.orderService.decrementOrder(this.order.productId, this.order.productPrice);
  }

  priceToTwoDec(price) {
    return parseFloat(price).toFixed(2)
  }

}
