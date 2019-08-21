addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  animateWigglies();
  getHeartAnimation();
  getEarthAnimation();
  getPigAnimation();
}

function getHeartAnimation() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayHeartAnimation;
  q.open("GET", '/heart.svg', true);
  q.send();
}

function displayHeartAnimation() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let heartSVG = document.getElementById("heart-container");
  heartSVG.innerHTML = this.responseText;
  addHeartAnimation();
}

function getEarthAnimation() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayEarthAnimation;
  q.open("GET", '/earth.svg', true);
  q.send();
}

function displayEarthAnimation() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let earthSVG = document.getElementById("earth-container");
  earthSVG.innerHTML = this.responseText;
  addEarthAnimation();
}

function getPigAnimation() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayPigAnimation;
  q.open("GET", '/pig.svg', true);
  q.send();
}

function displayPigAnimation() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let pigSVG = document.getElementById("pig-container");
  pigSVG.innerHTML = this.responseText;
  addPigAnimation();
}

function addHeartAnimation() {
  var heart = document.getElementById("heart");

  heart.addEventListener("mouseover", function() {
    heart.classList.add("run");
  });
  heart.addEventListener("animationend", function() {
    heart.classList.remove("run");
  });
}

function addEarthAnimation() {
  var earth = document.getElementById("earth");

  earth.addEventListener("mouseover", function() {
    earth.classList.add("run");
  });
  earth.addEventListener("animationend", function() {
    earth.classList.remove("run");
  });
}

function addPigAnimation() {
  var piggyBank = document.getElementById("piggy-bank");

  piggyBank.addEventListener("mouseover", function() {
    piggyBank.classList.add("run");
  });
  piggyBank.addEventListener("animationend", function() {
    piggyBank.classList.remove("run");
  });
}
