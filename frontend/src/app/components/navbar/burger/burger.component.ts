import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {

  open: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  burgerClick() {
    this.open = !this.open;
  }
}
