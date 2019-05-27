addEventListener('load', start);

function start() {
  document.getElementById("sign-in-button").addEventListener("click", postUsernamePassword);
}

function postUsernamePassword() {
  let userPass = {
    username: document.querySelector('input[name="username"]').value,
    password: document.querySelector('input[name="password"]').value
  }
  let q = new XMLHttpRequest();
  q.onreadystatechange = checkPassword;
  q.open("POST", '/login', true);
  q.send(JSON.stringify(userPass));
}

function checkPassword() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  result = JSON.parse(this.responseText);

  if(result.success) {
    let datetime = new Date();
    datetime.setHours(datetime.getHours() + 2);
    document.cookie = "jwt=" + result.token + "; expires=" + datetime.toUTCString() + "; path=/";
    window.location.reload(true);
  }
  else {
    document.getElementById("invalid-text").innerHTML = "Invalid Login Details";
  }
}
