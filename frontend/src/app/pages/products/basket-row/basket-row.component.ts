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
    this.orderService.incrementOrder(this.order);
  }

  decrementClick() {
    this.orderService.decrementOrder(this.order);
  }

  totalPriceCalc() {
    return this.order.quantity * this.order.product.price;
  }

}
