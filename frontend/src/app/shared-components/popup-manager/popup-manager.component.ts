import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/products/product.service';
import { PopupService } from '../../services/popup/popup.service';


@Component({
  selector: 'app-popup-manager',
  templateUrl: './popup-manager.component.html',
  styleUrls: ['./popup-manager.component.css']
})
export class PopupManagerComponent implements OnInit {

  products
  popupVis

  constructor(private productService:ProductService,
      private popupService:PopupService) { }

  ngOnInit() {
    this.popupService.popupVisObs.subscribe(res => this.popupVis = res);

    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;

        let popupVis = {};
        popupVis["checkout"] = false;
        for(let i = 0; i < res.length; i++) {
          popupVis["product-"+res[i]._id] = false;
        }

        this.popupService.updatePopupVis(popupVis);
      });
  }

}
