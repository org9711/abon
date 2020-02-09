import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  getAnimations() {
    return ANIMATIONS;
  }
}

const ANIMATIONS = [
  {
    id: "heart-container",
    src: "heart.svg",
    heading: "Better for you",
    text: "A plant based diet is widely recognised to increase life expectancy. Each Abon sachet also contains 3 of your 5 a day."
  },
  {
    id: "earth-container",
    src: "earth.svg",
    heading: "Better for the planet",
    text: "Cutting animal products from your diet is one of the best steps an individual can make towards saving the planet."
  },
  {
    id: "pig-container",
    src: "pig.svg",
    heading: "Better for your pocket",
    text: "With an RRP of £2.20, our products are not just healthier and tastier than our competitors'- they're better value too!"
  }
]
