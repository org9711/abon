import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

import { IProduct } from "../../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productObs: Observable<IProduct[]>;

  constructor(private http:HttpClient) { }

  getProducts() {
    if(this.productObs) {
      return this.productObs;
    }
    else {
      this.productObs = this.http.get<IProduct[]>("http://localhost:8080/products")
        .pipe(catchError(this.handleError<IProduct[]>('getProducts', [])))
        .pipe(share());
      return this.productObs;
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
