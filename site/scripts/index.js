addEventListener('load', start);

function start() {
    fetchData("/home");
    var homeButton = document.querySelector("#homePage"); 
    homeButton.addEventListener("click", function() {
        fetchData("/home")
    });
    var testimonialsButton = document.querySelector("#testimonialsPage")
    testimonialsButton.addEventListener("click", function() {
        fetchData("/testimonials")
    });
}

function fetchData(page) {
    var q = new XMLHttpRequest();
    q.onreadystatechange = receive;
    q.open("GET", page, true)
    q.send();
}

function receive() {
    if(this.readyState != XMLHttpRequest.DONE) return;
    splitPage = JSON.parse(this.responseText);
    var head = document.querySelector("#headerDiv");
    var body = document.querySelector("#bodyDiv");
    head.innerHTML = splitPage['head'];
    body.innerHTML = splitPage['body'];
}
