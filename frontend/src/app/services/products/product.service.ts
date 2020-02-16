import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, share } from 'rxjs/operators';

import { HttpService } from '../http/http.service'
import { IProduct } from "../../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productObs: Observable<IProduct[]>;

  constructor(private http:HttpService) { }

  getProducts():Observable<IProduct[]> {
    return this.http.get("products");
  }

}
