import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/products/product.service';
import { PopupService } from '../../services/popup/popup.service';
import { IProduct } from '../../models/product.model';
import { IPopupVis } from '../../models/popupVis.model';


@Component({
  selector: 'app-popup-manager',
  templateUrl: './popup-manager.component.html',
  styleUrls: ['./popup-manager.component.css']
})
export class PopupManagerComponent implements OnInit {

  products:IProduct[];
  popupVis:IPopupVis;

  constructor(private productService:ProductService,
      private popupService:PopupService) { }

  ngOnInit() {
    this.popupService.popupVisObs.subscribe(res => this.popupVis = res);

    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;

        delete(this.popupVis.products.placeholder);

        for(let i = 0; i < res.length; i++) {
          this.popupVis.products[res[i]._id] = false;
        }

        this.popupService.updatePopupVis(this.popupVis);
      });
  }

}
