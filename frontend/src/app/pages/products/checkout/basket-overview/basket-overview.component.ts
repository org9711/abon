import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from '../../../../models/order.model';


@Component({
  selector: 'basket-overview',
  templateUrl: './basket-overview.component.html',
  styleUrls: ['./basket-overview.component.css']
})
export class BasketOverviewComponent implements OnInit {

  @Input() orders:IOrder[];

  constructor() { }

  ngOnInit() {
  }

  private calculateTotalPrice() {
    let totalPrice = 0;
    for(let i = 0; i < this.orders.length; i++) {
      totalPrice += this.orders[i].quantity * this.orders[i].product.price;
    }
    return totalPrice;
  }

}
