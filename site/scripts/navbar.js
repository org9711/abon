addEventListener('load', start);

function start() {
    insertNavBar();
}

function insertNavBar() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = receiveNavbar;
    q.open("GET", '/navbar', true);
    q.send();
}

function receiveNavbar() {
    if(this.readyState != XMLHttpRequest.DONE) return;
    var navbar = document.querySelector("#navbar");
    navbar.innerHTML = this.responseText;
}
