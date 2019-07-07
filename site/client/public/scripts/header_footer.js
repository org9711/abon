function getHeader() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let header = document.getElementsByTagName("header")[0];
  header.innerHTML = this.responseText;
  var path = window.location.pathname;
  if (path != '/') {
    var headerId = path.substr(1, path.length) + 'Header';
    var pageHeading = document.getElementById(headerId);
    pageHeading.className = "active-tab";
  }
  addBurgerAnimation();
}

function getFooter() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = this.responseText;
}

function addBurgerAnimation() {
  var burgerMenu = document.getElementsByTagName('nav')[0];
  burgerMenu.addEventListener("click", function() {
    toggleAnimation(burgerMenu);
  });
}


function toggleAnimation(animation) {
  animation.classList.toggle("change");
}
