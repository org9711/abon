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
  console.log(userPass);
  q.send(JSON.stringify(userPass));
  return false;
}

function checkPassword() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  result = JSON.parse(this.responseText);

  if(result.success){
    let datetime = new Date();
    datetime.setHours(datetime.getHours() + 2);
    console.log(datetime);
    console.log(datetime.toUTCString());
    document.cookie = "jwt=" + result.token + "; expires=" + datetime.toUTCString() + "; path=/";
    console.log(window.location.pathname);
    let q = new XMLHttpRequest();
    q.onreadystatechange = replacePage;
    q.open("GET", window.location.pathname, true);
    // q.setRequestHeader('jwt', document.cookie);
    q.send();
  }
  else {
    document.getElementById("invalid-text").innerHTML = "Invalid Login Details";
  }
}

function replacePage() {
  // document.open();
  document.write(this.responseText);
  document.close();
}
