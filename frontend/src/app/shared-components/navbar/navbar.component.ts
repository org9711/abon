import { Component, OnInit, ViewChild } from '@angular/core';

import { BurgerComponent } from './burger/burger.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(BurgerComponent, {static: true}) burgerComponent:BurgerComponent;

  constructor() { }

  ngOnInit() {
  }

}
