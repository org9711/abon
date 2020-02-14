import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../services/products/product.service';
import { IProduct } from "../../../models/product.model";


@Component({
  selector: 'product-display-container',
  templateUrl: './product-display-container.component.html',
  styleUrls: ['./product-display-container.component.css']
})
export class ProductDisplayContainerComponent implements OnInit {

    products: IProduct[]

    constructor(private productService:ProductService) { }

    ngOnInit() {
      this.productService.getProducts()
        .subscribe(res => this.products = res);
    }

}
