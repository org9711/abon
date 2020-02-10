import { Component, OnInit } from '@angular/core';

import { AnimationService } from '../../../services/animations/animation.service'


@Component({
  selector: 'home-animations',
  templateUrl: './home-animations.component.html',
  styleUrls: ['./home-animations.component.css']
})
export class HomeAnimationsComponent implements OnInit {
  animations:any[]

  constructor(private AnimationService: AnimationService) { }

  ngOnInit() {
    this.animations = this.AnimationService.getAnimations();
  }

  addRun(event) {
    event.currentTarget.classList.add("run");
  }

  remRun(event) {
    event.currentTarget.classList.remove("run");
  }

}
