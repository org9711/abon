addEventListener('load', start);

function start() {
    insertNavBar();
}

function fetchData(page) {
    console.log(page);
    var q = new XMLHttpRequest();
    // q.onreadystatechange = receive;
    q.open("GET", page, true);
    q.send();
}

function insertNavBar() {
    console.log("insert nav bar function");
    var q = new XMLHttpRequest();
    q.onreadystatechange = receiveNavbar;
    q.open("GET", '/navbar', true);
    q.send();
}

function receiveNavbar() {
    console.log("receive navbar function");
    if(this.readyState != XMLHttpRequest.DONE) return;
    var navbar = document.querySelector("#navbar");
    navbar.innerHTML = this.responseText;
    // addNavbarListeners()
}
