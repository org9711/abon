import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IProduct } from "../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts():Observable<IProduct[]> {
    console.log("arrived at service");
    return this.http.get<IProduct[]>("http://localhost:8080/products")
      .pipe(catchError(this.handleError<IProduct[]>('getProducts', [])));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
