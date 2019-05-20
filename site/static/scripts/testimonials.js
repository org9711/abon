addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  // getTestimonials();
  // getTestimonialForm();
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

function getTestimonials() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayTestimonials;
  q.open("GET", '/testimonials/get_testimonials', true);
  q.send();
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
  q.onreadystatechange = displayTestimonialFormConfirmation;
  q.open("POST", '/testimonials/submit_testimonial', true);
  q.send(testimonial);
}

function displayTestimonialFormConfirmation() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var testimonialForm = document.querySelector("#testimonialForm");
  testimonialForm.innerHTML = this.responseText;
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
  let headerText = this.responseText;
  let headerTextSplit = headerText.split("$TESTIMONIALSCLASS$");
  headerText = headerTextSplit.join(" class=\"abon-yellow\"")
  headerText = headerText.replace(/\$\w*\$/g, "");
  header.innerHTML = headerText;
}

function getFooter() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var footer = document.querySelector("#footer");
  footer.innerHTML = this.responseText;
}
