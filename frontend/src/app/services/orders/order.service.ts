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

  private orders = new BehaviorSubject<IOrder[]>([]);
  public ordersObs = this.orders.asObservable();

  constructor(private http:HttpClient) { }

  incrementOrder(productId, productName, productPrice, productStock) {

    let newObj = [];

    const productPriceRound = parseFloat(productPrice).toFixed(2);

    if(this.orders.getValue() == null) {
      newObj.push({
        productId: productId,
        productName: productName,
        quantity: 1,
        productPrice: parseFloat(productPriceRound),
        totalPrice: parseFloat(productPriceRound),
        productStock: productStock
      });
    }
    else {
      let alreadyOrdered = false;
      newObj = this.orders.getValue();
      for(let i = 0; i < newObj.length; i++) {
        if(productId == newObj[i].productId) {
          const totalPriceRound = parseFloat(newObj[i].totalPrice).toFixed(2);
          alreadyOrdered = true;
          if(newObj[i].quantity < productStock) {
            newObj[i].quantity += 1;
            newObj[i].totalPrice = parseFloat(productPriceRound) + parseFloat(totalPriceRound)
          }
          break;
        }
      }
      if(!alreadyOrdered) {
        newObj.push({
          productId: productId,
          productName: productName,
          quantity: 1,
          productPrice: parseFloat(productPriceRound),
          totalPrice: parseFloat(productPriceRound),
          productStock: productStock
        });
      }
    }
    this.updateOrders(newObj);
  }

  decrementOrder(productId, productPrice) {

    let newObj = this.orders.getValue();

    const productPriceRound = parseFloat(productPrice).toFixed(2);

    for(let i = 0; i < newObj.length; i++) {
      if(productId == newObj[i].productId) {
        const totalPriceRound = newObj[i].totalPrice.toFixed(2);
        if(newObj[i].quantity == 1) {
          newObj.splice(i,1);
        }
        else {
          newObj[i].quantity -= 1;
          newObj[i].totalPrice = parseFloat(totalPriceRound) - parseFloat(productPriceRound);
        }
        this.orders.next(newObj);
        break;
      }
    }
  }

  private updateOrders(obj) {
    this.orders.next(obj);
  }

}
