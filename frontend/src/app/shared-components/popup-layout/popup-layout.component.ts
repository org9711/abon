import { Component, OnInit, Input } from '@angular/core';

import { PopupService } from '../../services/popup/popup.service';


@Component({
  selector: 'popup-layout',
  templateUrl: './popup-layout.component.html',
  styleUrls: ['./popup-layout.component.css']
})
export class PopupLayoutComponent implements OnInit {
  @Input() title: string;
  @Input() closeKey: string;
  popupVis
  closing = false;

  constructor(private popupService:PopupService) { }

  ngOnInit() {
    this.popupService.popupVisObs.subscribe(res => this.popupVis = res);
  }

  closePopup() {
    this.closing = true;
    setTimeout(() => {
      this.popupVis[this.closeKey] = !this.popupVis[this.closeKey]
      this.popupService.updatePopupVis(this.popupVis);
    }, 300)
  }

}
