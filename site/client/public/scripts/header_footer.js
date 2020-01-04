function displayHeader() {
  let header = document.getElementsByTagName("header")[0];
  getHTML('/frame/get_header')
    .then(res => header.appendChild(res))
    .then(() => {
      let path = window.location.pathname;
      addBurgerAnimation();
      if (path != '/') {
        let headerId = path.substr(1, path.length) + '-header';
        let pageHeading = document.getElementById(headerId);
        pageHeading.className = "active-tab";
      }
    });
}

function displayFooter() {
  let footer = document.getElementsByTagName("footer")[0];
  getHTML('/frame/get_footer')
    .then(res => footer.appendChild(res));
}

function addBurgerAnimation() {
  let burgerMenu = document.getElementById('burger');
  let linksTab = document.getElementById('nav-links');
  burgerMenu.addEventListener("click", function() {
    burgerMenu.classList.toggle("change");
    linksTab.classList.toggle("show");
  });
}
