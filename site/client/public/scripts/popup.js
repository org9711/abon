function assignClosePopupListener(popupLayout) {
  let closeButton = popupLayout.querySelector("#popup-x");
  closeButton.addEventListener("click", closePopup);
  return popupLayout;
}

function assignClosePopupRefreshListener(popupLayout) {
  let closeButton = popupLayout.querySelector("#popup-x");
  closeButton.addEventListener("click", closePopupAndRefresh);
  return popupLayout;
}

function unassignClosePopupListener(popupLayout) {
  let closeButton = popupLayout.querySelector("#popup-x");
  closeButton.removeEventListener("click", closePopup);
  return popupLayout;
}

function unassignClosePopupRefreshListener(popupLayout) {
  let closeButton = popupLayout.querySelector("#popup-x");
  closeButton.removeEventListener("click", closePopupAndRefresh);
  return popupLayout;
}

function closePopup() {
  let popupScreen = document.querySelector("#popup-screen");
  let popup = popupScreen.querySelector("#popup");
  popupScreen.classList.add("exit");
  popup.addEventListener("animationend", function() {
    popupScreen.parentNode.removeChild(popupScreen);
  });
}

function closePopupAndRefresh() {
  let popupScreen = document.querySelector("#popup-screen");
  popupScreen.parentNode.removeChild(popupScreen);
  window.location.reload(true);
}
