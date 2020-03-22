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

  constructor(public productService:ProductService) { }

  ngOnInit() {
  }

  stockText() {
    let text;
    if(this.product.status == "sold_out") text = "Back Soon";
    if(this.product.status == "coming_soon") text = "Coming Soon";
    if(this.product.status == "on_sale") text = this.product.stock + " units";
    return text;
  }

}
