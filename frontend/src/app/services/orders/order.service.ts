import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

import { HttpService } from "../http/http.service";
import { IOrder } from "../../models/order.model";
import { IProduct } from "../../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders = new BehaviorSubject<IOrder[]>([]);
  public ordersObs = this.orders.asObservable();

  constructor(private http:HttpService) { }

  initiateOrder() {
    let orders = [];
    let orderUnits = this.orders.getValue();
    for(let i = 0; i < orderUnits.length; i++) {
      orders.push({
        productId: orderUnits[i].product._id,
        productPrice: orderUnits[i].product.price,
        quantity: orderUnits[i].quantity
      });
    }
    return this.http.post("orders/initiate", orders);
  }

  basOrder(product) {
    let newObj = [];

    if(this.orders.getValue() == null) newObj = this.newOrder(newObj, product);
    else {
      newObj = this.orders.getValue();

      let alreadyExists = false;
      let ind;
      for(let i = 0; i < newObj.length; i++) {
        if(newObj[i].product._id === product._id) {
          alreadyExists = true;
          newObj = this.incrementQuantity(newObj, i);
          break
        }
      }
      if(!alreadyExists) newObj = this.newOrder(newObj, product);
    }

    this.updateOrders(newObj);
  }

  incrementOrder(order) {
    let newObj = this.orders.getValue();
    const ind = newObj.indexOf(order);
    if(ind === -1) newObj = this.newOrder(newObj, order.product);
    else newObj = this.incrementQuantity(newObj, ind);
    this.updateOrders(newObj);
  }

  decrementOrder(order) {
    let newObj = this.orders.getValue();
    const ind = newObj.indexOf(order);

    if(ind !== -1) {
      if(newObj[ind].quantity == 1) newObj.splice(ind,1);
      else newObj[ind].quantity -= 1;
    }

    this.updateOrders(newObj);
  }

  private newOrder(obj, product) {
    obj.push({
      product: product,
      quantity: 1,
    });
    return obj;
  }

  private incrementQuantity(obj, ind) {
    if(obj[ind].quantity < obj[ind].product.stock) obj[ind].quantity += 1;
    return obj;
  }

  private updateOrders(obj) {
    this.orders.next(obj);
  }

}
