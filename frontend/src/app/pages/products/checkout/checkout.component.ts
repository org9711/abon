import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators'

import { IOrder } from '../../../models/order.model';
import { OrderService } from '../../../services/orders/order.service';
import { PaypalService } from '../../../services/paypal/paypal.service';
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
  waitingOnPaypal:boolean = false;
  paymentSuccess:boolean = false;
  orderSummary;

  constructor(private orderService:OrderService,
    private paypalService:PaypalService) { }

  @ViewChild(CustomerFormsComponent, { static: false }) customerForms:CustomerFormsComponent;
  addCustomerError:boolean = false;
  addCustomerErrors = [];

  ngOnInit() {
    this.orderService.ordersObs.pipe(first()).subscribe(res => this.orders = res);
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
        let paypalTab:Window;
        this.customerAddedRes = true;
        this.addCustomerError = false;
        if(res.payment_method == "cash") {
          this.waitingOnPaypal = false;
          this.orderSummary = res;
          this.paymentSuccess = true;
          this.orderService.clearOrders();
        }
        else if(res.payment_method == "paypal") {
          this.waitingOnPaypal = true;
          const orderTokenJSON = { order_token: this.orderToken };
          this.paypalService.payPaypal(orderTokenJSON).subscribe(res => {
            paypalTab = window.open(res.paymentDetails.redirectLink, "_blank");
          });
          this.paypalService.listenForCompletion()
            .pipe(first())
            .subscribe(res => {
              let jsonRes = JSON.parse(res);
              if(jsonRes.success) {
                this.orderSummary = JSON.parse(res);
                this.paymentSuccess = true;
                this.orderService.clearOrders();
              }
              else {
                console.error(jsonRes.errors);
              }
              this.waitingOnPaypal = false;
              paypalTab.close();
          });
        }
      },
      err => {
        this.addCustomerErrors = err.errors;
        this.addCustomerError = true;
      }
    );
  }

  inactiveOrder() {
    const orderTokenJSON = { order_token: this.orderToken };
    if(!this.customerAddedRes) {
      this.orderService.inactiveOrder(orderTokenJSON).subscribe(
        res => sessionStorage.removeItem('orderToken'));
    }
  }


}
