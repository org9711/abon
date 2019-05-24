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
  success = JSON.parse(this.responseText);
  let userSuccess = success.username;
  let passwordSuccess = success.password;
}
