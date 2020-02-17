import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators'

import { IOrder } from '../../../models/order.model';
import { OrderService } from '../../../services/orders/order.service';
import { CustomerFormsComponent } from './customer-forms/customer-forms.component';
import { IOrderCust } from '../../../models/orderCust.model';


@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  withinTime:boolean = true;
  maxTimeSecs:number = 5 * 60;
  orders:IOrder[];
  validForm:boolean = false;

  constructor(private orderService:OrderService) { }

  @ViewChild(CustomerFormsComponent, { static: false }) customerForms:CustomerFormsComponent;

  ngOnInit() {
    this.orderService.ordersObs.pipe(take(1)).subscribe(res => this.orders = res);
  }

  ngAfterViewInit() {
    this.customerForms.form.statusChanges.subscribe(status => {
      this.validForm = status == "VALID";
    });
  }

  timesUpRes() {
    this.withinTime = false;
  }

  formSubmitted(event) {
    const paymentMethod = event.currentTarget.id.split("-")[0];
    const formValues = this.customerForms.form.value;

    const details:IOrderCust = {
      payment_method: paymentMethod,
      customer_details: {
        firstname: formValues.fname,
        surname: formValues.sname,
        email: formValues.email
      },
      address_details: {
        line1: formValues.addr1,
        line2: formValues.addr2,
        town: formValues.town,
        county: formValues.county,
        postcode: formValues.postcode
      }
    }

    this.orderService.addCustomerToOrder(details).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }


}
