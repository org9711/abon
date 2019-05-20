addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getTestimonialLayout();
  // getTestimonialForm();
}

var testimonialLayout;

function getTestimonialLayout() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = storeTestimonialLayout;
  q.open("GET", '/testimonials/get_testimonial_layout', true);
  q.send();
}

function storeTestimonialLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var el = document.createElement('html');
  el.innerHTML = this.responseText;
  testimonialLayout = el;
  getTestimonials();
}

function getTestimonials() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayTestimonials;
  q.open("GET", '/testimonials/get_approved', true);
  q.send();
}

function displayTestimonials() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  let reviews = JSON.parse(this.responseText);
  let ul = document.getElementsByClassName('row')[0];
  for (var i = 0; i < reviews.length; i++) {
    let review = testimonialLayout.cloneNode(true);
    let starsDiv = review.getElementsByClassName('card-header abon-bg-orange')[0];
    let nameTag = review.getElementsByClassName('font-weight-bold mb-4')[0];
    let descriptionTag = review.getElementsByClassName('dark-grey-text mt-4')[0];

    console.log('div before:')
    console.log(starsDiv);

    for (let j = 0; j < reviews[i].stars; j++) {
      let newSpan = document.createElement('span');
      newSpan.className = "fa fa-star checked";
      starsDiv.append(newSpan);
      console.log('pos:')
      console.log(newSpan)
    }
    for (let j = 0; j < 5 - reviews[i].stars; j++) {
      let newSpan = document.createElement('span');
      newSpan.className = "fa fa-star";
      starsDiv.append(newSpan);
      console.log('neg:')
      console.log(newSpan)
    }

    console.log('div after:')
    console.log(starsDiv);

    nameTag.textContent = reviews[i].name;
    descriptionTag.textContent += reviews[i].review;

    review = review.firstElementChild;
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