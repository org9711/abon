import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'checkout-timer',
  templateUrl: './checkout-timer.component.html',
  styleUrls: ['./checkout-timer.component.css']
})
export class CheckoutTimerComponent implements OnInit {

  @Input() timeLeftSecs:number;
  @Output() timesUp = new EventEmitter();
  minuteCounter:string;
  secondCounter:string;

  constructor() { }

  ngOnInit() {
    this.minuteCounter = this.zeroPad(Math.floor(this.timeLeftSecs / 60), 2);
    this.secondCounter = this.zeroPad(Math.floor(this.timeLeftSecs % 60), 2);
    let interval = setInterval(() => {
      if(this.timeLeftSecs > 0) {
        this.timeLeftSecs--;
        this.minuteCounter = this.zeroPad(Math.floor(this.timeLeftSecs / 60), 2);
        this.secondCounter = this.zeroPad(Math.floor(this.timeLeftSecs % 60), 2);
      }
      else {
        this.timesUp.emit(true);
        clearInterval(interval);
      }
    },1000);
  }

  public zeroPad(inpNum:number, digitsShown:number) {
    let padding = "0".repeat(digitsShown);
    let whole = padding + inpNum.toString();
    let final = whole.substr(whole.length - digitsShown, whole.length);
    return final;
  }

}
