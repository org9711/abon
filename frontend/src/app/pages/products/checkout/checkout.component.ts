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
  orderToken:string = sessionStorage.getItem('orderToken');
  orders:IOrder[];
  validForm:boolean = false;
  customerAddedRes:boolean = false;

  constructor(private orderService:OrderService) { }

  @ViewChild(CustomerFormsComponent, { static: false }) customerForms:CustomerFormsComponent;
  addCustomerError:boolean = false;
  addCustomerErrors = [];

  ngOnInit() {
    this.orderService.ordersObs.pipe(take(1)).subscribe(res => this.orders = res);
    window.addEventListener('beforeunload', this.inactiveOrder);
  }

  ngAfterViewInit() {
    this.customerForms.form.statusChanges.subscribe(status => {
      this.validForm = status == "VALID";
    });
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.inactiveOrder);
    this.inactiveOrder();
  }

  timesUpRes() {
    this.withinTime = false;
  }

  formSubmitted(event) {
    const paymentMethod = event.currentTarget.id.split("-")[0];
    const formValues = this.customerForms.form.value;

    const details:IOrderCust = {
      order_token: sessionStorage.getItem('orderToken'),
      payment_method: paymentMethod,
      customer_details: {
        firstname: formValues.fname,
        surname: formValues.sname,
        email: formValues.email
      },
      address: {
        line1: formValues.addr1,
        line2: formValues.addr2,
        town: formValues.town,
        county: formValues.county,
        postcode: formValues.postcode
      }
    }

    this.orderService.addCustomerToOrder(details).subscribe(
      res => {
        this.customerAddedRes = true;
        this.addCustomerError = false;
        if(res.payment_method == "cash") {
          console.log("show order summary screen");
        }
        else if(res.payment_method == "paypal") {
          console.log("make request to paypal api");
        }
      },
      err => {
        this.addCustomerErrors = err.errors;
        this.addCustomerError = true;
      }
    );
  }

  inactiveOrder() {
    const orderTokenJSON = { order_token: this.orderToken }
    if(!this.customerAddedRes) {
      this.orderService.inactiveOrder(orderTokenJSON).subscribe(
        res => sessionStorage.removeItem('orderToken'));
    }
  }


}
