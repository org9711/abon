addEventListener('load', start);

function start() {
    console.log("loaded");
    getHeader();
    getFooter();
    getTestimonials();
    getTestimonialForm();
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

function getTestimonialForm() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = displayTestimonialForm;
    q.open("GET", '/testimonials/get_testimonial_form', true);
    q.send();
}

function displayTestimonialForm() {
    if(this.readyState != XMLHttpRequest.DONE) return;
    var testimonialForm = document.querySelector("#testimonialForm");
    testimonialForm.innerHTML = this.responseText;
    document.querySelector("#submitTestimonial").addEventListener("click", postTestimonial);
}

function postTestimonial() {
    let stars = document.getElementsByName("stars");
    let star = 0;
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].checked) {
            star = stars[i].value;
        }
    }
    testimonialObj = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        title: document.querySelector('input[name="title"]').value,
        stars: star,
        review: document.querySelector('input[name="review"]').value
    };
    testimonial = JSON.stringify(testimonialObj);
    var q = new XMLHttpRequest();
    q.onreadystatechange = displaySubmissionConfirmation;
    q.open("POST", '/testimonials/submit_testimonial', true);
    q.setRequestHeader("Content-type", "application/JSON");
    q.send(testimonial);
}


function getHeader() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = displayHeader;
    q.open("GET", '/frame/get_header', true);
    q.send();
}

function displayHeader() {
    if(this.readyState != XMLHttpRequest.DONE) return;
    var header = document.querySelector("#header");
    header.innerHTML = this.responseText;
}

function getFooter() {
    var q = new XMLHttpRequest();
    q.onreadystatechange = displayFooter;
    q.open("GET", '/frame/get_footer', true);
    q.send();
}

function displaySubmissionConfirmation() {
    if(this.readyState != XMLHttpRequest.DONE) return;
    var testimonialForm = document.querySelector("#testimonialForm");
    testimonialForm.innerHTML = this.responseText;
}
