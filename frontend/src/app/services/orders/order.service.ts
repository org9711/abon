import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

import { IOrder } from "../../models/order.model";
import { IProduct } from "../../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersObs = new BehaviorSubject<IOrder[]>(null);

  constructor(private http:HttpClient) { }

  incrementOrder(product:IProduct) {

    let newObj = [];

    if(this.ordersObs.getValue() == null) {
      newObj.push({
        productId: product._id,
        productName: product.name,
        quantity: 1,
        price: product.price
      });
    }
    else {
      let alreadyOrdered = false;
      newObj = this.ordersObs.getValue();
      for(let i = 0; i < newObj.length; i++) {
        if(product._id == newObj[i].productId) {
          alreadyOrdered = true;
          newObj[i].quantity += 1;
          newObj[i].price += product.price
          break;
        }
      }
      if(!alreadyOrdered) {
        newObj.push({
          productId: product._id,
          productName: product.name,
          quantity: 1,
          price: product.price
        });
      }
    }
    this.updateOrders(newObj);
  }

  decrementOrder(product:IProduct) {

    let newObj = this.ordersObs.getValue();

    for(let i = 0; i < newObj.length; i++) {
      if(product._id == newObj[i].productId) {
        if(newObj[i].quantity == 1) {
          delete(newObj[i]);
        }
        else {
          newObj[i].quantity -= 1;
        }
        this.ordersObs.next(newObj);
        break;
      }
    }
  }

  private updateOrders(obj) {
    this.ordersObs.next(obj);
  }

}
