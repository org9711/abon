let xs = [];
let t = 0;

for (var i = 0; i < 2000; i++) {
  xs.push(i);
}

function animateWigglies() {
  let points = xs.map(x => {
    let y = 10 + 5 * Math.sin((x+t) / 10);
    return [x, y]
  });

  let path = "M" + points.map(p => {
    return p[0] + "," + p[1];
  }).join(" L");

  let wigglies = document.querySelectorAll('path.wiggle');

  for(let i = 0; i < wigglies.length; i++) {
    wigglies[i].setAttribute("d", path);
  }

  t += 1;
  requestAnimationFrame(animateWigglies);
}
