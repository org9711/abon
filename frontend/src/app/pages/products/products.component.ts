import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsPage implements OnInit {

  products

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe();
  }

}
