addEventListener('load', testimonialStart);

function testimonialStart() {
    console.log("loaded");
    getTestimonials();
}

function getTestimonials() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = displayTestimonials;
    q.open("GET", '/testimonials/get_testimonials', true);
    q.send();
}

function displayTestimonials() {
    if (this.readyState != XMLHttpRequest.DONE) return;
    let reviews = JSON.parse(this.responseText);
    console.log(reviews);
    let ul = document.querySelector("#pastTestimonials");
    for (var i = 0; i < reviews.length; i++) {
        let review = document.createElement('div');
        var title = document.createElement('h3');
        var name = document.createElement('h4');
        var stars = document.createElement('p');
        var description = document.createElement('p');

        title.textContent = reviews[i].title;
        name.textContent = reviews[i].name;
        stars.textContent = reviews[i].stars;
        description.textContent = reviews[i].review;

        review.appendChild(title);
        review.appendChild(name);
        review.appendChild(stars);
        review.appendChild(description);

        ul.appendChild(review);
    }
}

function postTestimonial() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = displayConfirmation;
    q.open("POST", '/testimonials/submit_testimonial', true);
    q.send();
}

function displayConfirmation() {
    if (this.readyState != XMLHttpRequest.DONE) return;
    console.log("display confirmation");
}