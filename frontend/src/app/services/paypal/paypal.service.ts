import { Injectable } from '@angular/core';

import { HttpService } from "../http/http.service";


@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(public http:HttpService) { }

  payPaypal(orderToken) {
    return this.http.post("paypal/pay", orderToken);
  }

  listenForCompletion() {
    return this.http.getServerSentEvent("paypal/listen");
  }

}
