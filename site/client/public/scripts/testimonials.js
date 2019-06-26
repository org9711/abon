addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getTestimonialLayout();
  getTestimonialForm();
}

let testimonialLayout;

function getTestimonialLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeTestimonialLayout;
  q.open("GET", '/testimonials/get_testimonial_layout', true);
  q.send();
}

function storeTestimonialLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let el = document.createElement('html');
  el.innerHTML = this.responseText;
  testimonialLayout = el;
  getTestimonials();
}

function getTestimonials() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayTestimonials;
  q.open("GET", '/testimonials/get_approved', true);
  q.send();
}

function displayTestimonials() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  let reviews = JSON.parse(this.responseText);
  let ul = document.getElementsByClassName('row')[0];
  for (let i = 0; i < reviews.length; i++) {
    let review = testimonialLayout.cloneNode(true);
    let starsDiv = review.getElementsByClassName('card-header abon-bg-orange')[0];
    let nameTag = review.getElementsByClassName('font-weight-bold mb-4')[0];
    let descriptionTag = review.getElementsByClassName('dark-grey-text mt-4')[0];

    for (let j = 0; j < reviews[i].stars; j++) {
      let newSpan = document.createElement('span');
      newSpan.className = "fa fa-star checked";
      starsDiv.append(newSpan);
    }
    for (let j = 0; j < 5 - reviews[i].stars; j++) {
      let newSpan = document.createElement('span');
      newSpan.className = "fa fa-star";
      starsDiv.append(newSpan);
    }

    nameTag.textContent = reviews[i].name;
    descriptionTag.textContent += reviews[i].review;

    review = review.firstElementChild;
    ul.appendChild(review);
  }
}

function getTestimonialForm() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayTestimonialForm;
  q.open("GET", '/testimonials/get_testimonial_form', true);
  q.send();
}

function displayTestimonialForm() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let testimonialForm = document.getElementsByClassName("container my-4")[0];
  testimonialForm.innerHTML = this.responseText;
//  document.getElementsByClassName("btn btn-lg btn-primary float-right")[0].addEventListener("click", postTestimonial);
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
    stars: star,
    review: document.querySelector('textarea[name="review"]').value
  };
  testimonial = JSON.stringify(testimonialObj);
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayTestimonialFormConfirmation;
  q.open("POST", '/testimonials/submit_testimonial', true);
  q.send(testimonial);
}

function displayTestimonialFormConfirmation() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let testimonialForm = document.getElementsByClassName("container my-4")[0];
  testimonialForm.innerHTML = this.responseText;
}


function validation() {
  let check = document.getElementById("check-valid");
  let valid = check.checkValidity();
  if(valid) {
    postTestimonial();
  }
  return false;
}


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
  pageHeading = document.getElementById("testimonialsHeader");
  pageHeading.className = "active-tab"
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
