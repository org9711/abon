import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';

import { HttpService } from "../http/http.service";
import { IOrder } from "../../models/order.model";
import { IProduct } from "../../models/product.model";
import { IOrderCust } from "../../models/orderCust.model";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orders = new BehaviorSubject<IOrder[]>([]);
  public ordersObs = this.orders.asObservable();

  constructor(public http:HttpService) { }

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

  addCustomerToOrder(details:IOrderCust) {
    return this.http.post("orders/add_customer", details);
  }

  inactiveOrder(orderToken) {
    return this.http.post("orders/inactive_order", orderToken);
  }

  basOrder(product:IProduct) {
    let newObj = [];

    if(this.orders.getValue() == null) newObj = this.newOrder(newObj, product);
    else {
      newObj = this.orders.getValue();

      let alreadyExists = false;
      for(let i = 0; i < newObj.length; i++) {
        if(newObj[i].product._id === product._id) {
          alreadyExists = true;
          newObj = this.incrementQuantity(newObj, i);
          break
        }
      }
      if(!alreadyExists && product.stock) newObj = this.newOrder(newObj, product);
    }

    this.updateOrders(newObj);
  }

  incrementOrder(order:IOrder) {
    let newObj = this.orders.getValue();
    const ind = newObj.indexOf(order);
    if(ind === -1) newObj = this.newOrder(newObj, order.product);
    else newObj = this.incrementQuantity(newObj, ind);
    this.updateOrders(newObj);
  }

  decrementOrder(order:IOrder) {
    let newObj = this.orders.getValue();
    const ind = newObj.indexOf(order);

    if(ind !== -1) {
      if(newObj[ind].quantity == 1) newObj.splice(ind,1);
      else newObj[ind].quantity -= 1;
    }

    this.updateOrders(newObj);
  }

  clearOrders() {
    this.updateOrders([]);
  }

  public newOrder(obj, product:IProduct) {
    obj.push({
      product: product,
      quantity: 1,
    });
    return obj;
  }

  public incrementQuantity(obj:IOrder[], ind:number) {
    if(obj[ind].quantity < obj[ind].product.stock) obj[ind].quantity += 1;
    return obj;
  }

  public updateOrders(obj:IOrder[]) {
    this.orders.next(obj);
  }

}
