addEventListener('load', start);

function start() {
  displayHeader();
  displayFooter();
  animateWigglies();
  addSVGs();
}

function addSVGs() {
  let animationNames = ["heart", "earth", "pig"];
  for(let i = 0; i < animationNames.length; i++) {
    let container = document.getElementById(animationNames[i] + "-container");
    getHTML('/' + animationNames[i] + '.svg')
      .then(res => container.appendChild(res));
    animateSVG(container);
  }
}

function animateSVG(anim) {
  anim.addEventListener("mouseover", function() {
    anim.classList.add("run");
  });
  anim.addEventListener("animationend", function() {
    anim.classList.remove("run");
  });
}
