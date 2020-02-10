import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupVis = new BehaviorSubject<Object>({});
  public popupVisObs = this.popupVis.asObservable();

  updatePopupVis(obj) {
    this.popupVis.next(obj);
  }

}
