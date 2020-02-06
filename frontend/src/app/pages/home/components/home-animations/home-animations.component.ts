import { Component, OnInit } from '@angular/core';
import { AnimationsService } from './animations.service'

@Component({
  selector: 'home-animations',
  templateUrl: './home-animations.component.html',
  styleUrls: ['./home-animations.component.css']
})
export class HomeAnimationsComponent implements OnInit {
  animations:any[]

  constructor(private AnimationsService: AnimationsService) { }

  ngOnInit() {
    this.animations = this.AnimationsService.getAnimations();
  }

  addRun(event) {
    event.currentTarget.classList.add("run");
    console.log("hover " + JSON.stringify(event.currentTarget.id))
  }

  remRun(event) {
    event.currentTarget.classList.remove("run");
    console.log("hover " + JSON.stringify(event.currentTarget.id))
  }

}
