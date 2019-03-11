addEventListener('load', start);

function start() {
    fetchReviews();
}

function fetchReviews() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = displayReviews;
    q.open("GET", '/testimonials/getreviews', true);
    q.send();
}

function displayReviews() {
    if (this.readyState != XMLHttpRequest.DONE) return;
    let reviews = JSON.parse(this.responseText);
    let ul = document.querySelector("#pastTestimonials");
    for (var i = 0; i < reviews.length; i++) {
        let review = document.createElement('div');
        var title = document.createElement('h3');
        var name = document.createElement('h4');
        var stars = document.createElement('p');
        var description = document.createElement('p');

        title.textContent = reviews[0].title;
        name.textContent = reviews[0].name;
        stars.textContent = reviews[0].stars;
        description.textContent = reviews[0].review;


        review.appendChild(title);
        review.appendChild(name);
        review.appendChild(stars);
        review.appendChild(description);

        ul.appendChild(review);
    }
}

function sendResponse() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = displayReviews;
    q.open("POST", '/testimonials/submitreviews', true);
    q.send();
}

function displayConfirmation() {
    if (this.readyState != XMLHttpRequest.DONE) return;
    console.log("response ready to process")
}