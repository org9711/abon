import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { HttpService } from '../http/http.service';
import { IProduct } from "../../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productObs: Observable<IProduct[]>;

  constructor(public http:HttpService) { }

  getProducts():Observable<IProduct[]> {
    if(!this.productObs) {
      this.productObs = this.http.get("products")
        .pipe(share());
    }
    return this.productObs;
  }

}
