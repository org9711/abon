let popupLayout;

function getPopupLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storePopupLaylout;
  q.open("GET", '/frame/get_popup_layout', true);
  q.send();
}

function storePopupLaylout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  popupLayout = el;
}

function assignClosePopupListener(popupLayout) {
  let closeButton = popupLayout.querySelector("#popup-x");
  closeButton.addEventListener("click", function() {
    let popupScreen = document.querySelector("#popup-screen");
    let popup = popupScreen.querySelector("#popup");
    popupScreen.classList.add("exit");
    popup.addEventListener("animationend", function() {
      popupScreen.parentNode.removeChild(popupScreen);
    });
  });
  return popupLayout;
}

function assignClosePopupRefreshListener(popupLayout) {
  let closeButton = popupLayout.querySelector("#popup-x");
  closeButton.addEventListener("click", function() {
    let popupScreen = document.querySelector("#popup-screen");
    popupScreen.parentNode.removeChild(popupScreen);
    window.location.reload(true);
  });
  return popupLayout;
}
