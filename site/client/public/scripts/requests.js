function getHTML(url) {
  return fetch(url)
  .then(res => res.text())
  .then(res => {
    el = document.createElement("html")
    el.innerHTML = res;
    return el.firstElementChild;
  });
}

function getJSON(url) {
  return fetch(url)
    .then(res => res.json());
}

function postJSON(url, body) {
  let options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return fetch(url, options);
}
