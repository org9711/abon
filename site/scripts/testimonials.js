addEventListener('load', start);

function start() {
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

function displaySubmissionConfirmation() {
    if(this.readyState != XMLHttpRequest.DONE) return;
    var testimonialForm = document.querySelector("#testimonialForm");
    testimonialForm.innerHTML = this.responseText;
}