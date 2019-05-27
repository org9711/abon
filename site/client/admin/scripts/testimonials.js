addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getTestimonialLayout();
}

let testimonialLayout;

function getTestimonialLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeTestimonialLayout;
  q.open("GET", 'admin/testimonials/get_row_layout', true);
  q.send();
}

function storeTestimonialLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  testimonialLayout = el;
  getTestimonials();
}

function getTestimonials() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayTestimonials;
  q.open("GET", 'admin/testimonials/get_testimonials', true);
  q.send();
}

function displayTestimonials() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  testimonials = JSON.parse(this.responseText);
  for (let i = 0; i < testimonials.length; i++) {
    appendTestimonialToTable(testimonials[i]);
  }
}

function appendTestimonialToTable(testimonial) {
  let ul = document.querySelector("table");
  let testimonialTag = testimonialLayout.cloneNode(true);

  let testimonialIdTag = testimonialTag.getElementsByClassName('pt-3-half review-id')[0];
  let testimonialNameTag = testimonialTag.getElementsByClassName('pt-3-half reviewer-name')[0];
  let testimonialDescriptionTag = testimonialTag.getElementsByClassName('review-description')[0];
  let testimonialStarsTag = testimonialTag.getElementsByClassName('pt-3-half review-stars')[0];
  let testimonialStatusTag = testimonialTag.getElementsByClassName('form-control testimonial-status')[0];
  let confirmButton = testimonialTag.getElementsByClassName('btn btn-success btn-rounded confirmBtn btn-sm my-0')[0];
  let removeButton = testimonialTag.getElementsByClassName('btn btn-danger btn-rounded removeBtn btn-sm my-0')[0];

  let testimonialId = testimonial.id;
  let testimonialName = testimonial.name;
  let testimonialReview = testimonial.review;
  let testimonialStars = testimonial.stars;
  let testimonialStatus = testimonial.status;

  let preselectedOption = testimonialStatusTag.getElementsByClassName('testimonial-status-' + testimonialStatus)[0];
  preselectedOption.selected = true;

  testimonialIdTag.innerText = testimonialId;
  testimonialNameTag.innerText = testimonialName;
  testimonialDescriptionTag.innerText = testimonialReview;
  testimonialStarsTag.innerText = testimonialStars;

  confirmButton.addEventListener("click", function() {
    let statusTag = findSelectedOption(testimonialStatusTag);
    let testimonialObj = {
      id: testimonialId,
      status: statusEncoding(statusTag.innerText),
    };
    let q = new XMLHttpRequest();
    q.open("POST", 'admin/testimonials/update_testimonial', true);
    q.send(JSON.stringify(testimonialObj));
  });

  testimonial = testimonialTag.firstElementChild;

  removeButton.addEventListener("click", function() {
    ul.removeChild(testimonial);
    let testimonialObj = {
      id: testimonialId
    };
    let q = new XMLHttpRequest();
    q.open("POST", 'admin/testimonials/remove_testimonial', true);
    q.send(JSON.stringify(testimonialObj));
  });

  ul.append(testimonial);
}

function findSelectedOption(selector) {
  for (let i = 0; i < selector.children.length; i++) {
    if (selector.children[i].selected) {
      return selector.children[i];
    }
  }
}

function statusEncoding(status){
  switch (status) {
    case 'Showing':
      return 1;
    case 'Hidden':
      return 0;
  }
}

function getHeader() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/admin/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let header = document.getElementsByTagName("header")[0];
  header.innerHTML = this.responseText;
  pageHeading = header.getElementsByClassName("testimonialsHeader")[0];
  pageHeading.className = "abon-yellow"
}

function getFooter() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/admin/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = this.responseText;
}
