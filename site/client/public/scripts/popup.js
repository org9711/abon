function getPopupLaylout() {
  getHTML('/frame/get_popup_layout')
    .then(res => {

    })
  return fetch('/frame/get_popup_layout')
    .then(res => res.text())
    .then(res => {
      el = document.createElement("html");
      el.innerHTML = res;
      return el;
    })
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
