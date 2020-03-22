import { Component, OnInit, Input } from '@angular/core';

import { PopupService } from '../../services/popup/popup.service';
import { IPopupVis } from '../../models/popupVis.model';


@Component({
  selector: 'popup-layout',
  templateUrl: './popup-layout.component.html',
  styleUrls: ['./popup-layout.component.css']
})
export class PopupLayoutComponent implements OnInit {
  @Input() title: string;
  @Input() closeKey: string;
  popupVis:IPopupVis;
  closing = false;

  constructor(public popupService:PopupService) { }

  ngOnInit() {
    this.popupService.popupVisObs.subscribe(res => this.popupVis = res);
  }

  closePopup() {
    this.closing = true;
    setTimeout(() => {
      if(this.closeKey.startsWith("product.")) {
        this.popupVis.products[this.closeKey.split(".")[1]] = !this.popupVis.products[this.closeKey.split(".")[1]];
      }
      else {
        this.popupVis[this.closeKey] = !this.popupVis[this.closeKey];
      }
      this.popupService.updatePopupVis(this.popupVis);
    }, 300);
  }

}
