let xs = [];
let t = 0;

for (let i = 0; i < 2000; i++) {
  xs.push(i);
}

animateWigglies();

function animateWigglies() {

  let wigglies = document.querySelectorAll('.wiggle path');

  if(wigglies.length) {
    let points = xs.map(x => {
      let y = 10 + 5 * Math.sin((x+t) / 10);
      return [x, y]
    });

    let path = "M" + points.map(p => {
      return p[0] + "," + p[1];
    }).join(" L");


    for(let i = 0; i < wigglies.length; i++) {
      wigglies[i].setAttribute("d", path);
    }

    t += 1;
  }

  requestAnimationFrame(animateWigglies);
}
