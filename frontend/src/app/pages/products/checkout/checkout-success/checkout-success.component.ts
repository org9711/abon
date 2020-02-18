import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {

  @Input() orderSummary;

  constructor() { }

  ngOnInit() {
  }

}
