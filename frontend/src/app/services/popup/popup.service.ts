import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProductService } from '../products/product.service';
import { IPopupVis } from '../../models/popupVis.model';


@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupVis = new BehaviorSubject<IPopupVis>({
    order_checkout: false,
    products: {
      placeholder: false
    }
  });
  public popupVisObs = this.popupVis.asObservable();

  updatePopupVis(obj:IPopupVis) {
    this.popupVis.next(obj);
  }

}
