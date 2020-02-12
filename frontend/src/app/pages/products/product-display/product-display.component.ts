import { Component, OnInit, Input } from '@angular/core';

import { PopupService } from '../../../services/popup/popup.service';
import { IProduct } from '../../../models/product.model';
import { OrderService } from '../../../services/orders/order.service';


@Component({
  selector: 'product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  @Input() product:IProduct;
  popupVis = {};

  constructor(private popupService:PopupService,
    private orderService:OrderService) { }

  ngOnInit() {
    this.popupService.popupVisObs.subscribe(res => this.popupVis = res);
  }

  basketClicked() {
    this.orderService.basOrder(this.product);
  }

  checkOffsale() {
    return (this.product.status == "sold_out" || this.product.status == "coming_soon");
  }

  mouseEnter(event) {
    const cl = event.currentTarget.classList;
    if (cl.contains("animation-end")) {
      cl.add("mouse-on");
      cl.remove("mouse-off");
      cl.remove("await-animation-end_mouse-off");
    }
    else {
      cl.add("await-animation-end_mouse-on");
    }
  }

  mouseLeave(event) {
    const cl = event.currentTarget.classList;
    if (cl.contains("animation-end")) {
      cl.add("mouse-off");
      cl.remove("mouse-on");
      cl.remove("await-animation-end_mouse-on");
    }
    else {
      cl.add("await-animation-end_mouse-off");
    }
  }

  animationStart(event) {
    event.currentTarget.classList.remove("animation-end");

  }

  animationEnd(event) {
    const cl = event.currentTarget.classList;
    cl.add("animation-end");
    if (cl.contains("await-animation-end_mouse-on")) {
      cl.add("mouse-on");
      cl.remove("mouse-off");
      cl.remove("await-animation-end_mouse-on");
    }
    if (cl.contains("await-animation-end_mouse-off")) {
      cl.add("mouse-off");
      cl.remove("mouse-on");
      cl.remove("await-animation-end_mouse-off");
    }
  }

  infoClicked() {
    this.popupVis["product-" + this.product._id] = !this.popupVis["product-" + this.product._id];
    this.popupService.updatePopupVis(this.popupVis);
  }

}
