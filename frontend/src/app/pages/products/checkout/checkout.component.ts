import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators'

import { IOrder } from '../../../models/order.model';
import { OrderService } from '../../../services/orders/order.service';


@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  withinTime:boolean = true;
  maxTimeSecs:number = 0.1 * 60;
  orders:IOrder[];

  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.orderService.ordersObs.pipe(take(1)).subscribe(res => this.orders = res);
  }

  timesUpRes() {
    this.withinTime = false;
  }

}
