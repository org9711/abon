import { Component, OnInit, Input } from '@angular/core';

import { ProductService } from '../../../services/products/product.service';
import { IProduct } from '../../../models/product.model';


@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input() product:IProduct

  constructor(private productService:ProductService) { }

  ngOnInit() {
  }

  priceToString(price) {
    let priceString = price.toString();
    if(priceString.includes(".")) {
      let integer = priceString.split(".")[0];
      let decimal = priceString.split(".")[1];
      decimal += '00';
      decimal = decimal.substring(0,2);
      priceString = integer + "." + decimal;
    }
    else {
      priceString += '.00';
    }
    return priceString;
  }

}
