import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  icon = "&#x1F6D2;"

  constructor() { }

  ngOnInit() {
  }

  @Input() product:any

  checkOffsale() {
    return (this.product.status == "sold_out" || this.product.status == "coming_soon");
  }

  mouseEnter(event) {
    const cl = event.currentTarget.classList;
    if (cl.contains("animation-end")) {
      cl.add("mouse-on");
      cl.remove("mouse-off");
      cl.remove("await-animation-end_mouse-off");
    }
    else {
      cl.add("await-animation-end_mouse-on");
    }
  }

  mouseLeave(event) {
    const cl = event.currentTarget.classList;
    if (cl.contains("animation-end")) {
      cl.add("mouse-off");
      cl.remove("mouse-on");
      cl.remove("await-animation-end_mouse-on");
    }
    else {
      cl.add("await-animation-end_mouse-off");
    }
  }

  animationStart(event) {
    event.currentTarget.classList.remove("animation-end");

  }

  animationEnd(event) {
    const cl = event.currentTarget.classList;
    cl.add("animation-end");
    if (cl.contains("await-animation-end_mouse-on")) {
      cl.add("mouse-on");
      cl.remove("mouse-off");
      cl.remove("await-animation-end_mouse-on");
    }
    if (cl.contains("await-animation-end_mouse-off")) {
      cl.add("mouse-off");
      cl.remove("mouse-on");
      cl.remove("await-animation-end_mouse-off");
    }
  }

}
