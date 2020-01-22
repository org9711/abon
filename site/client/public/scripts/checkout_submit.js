function addPayButtonEventListeners(checkoutPopupBodyDiv) {
  let cashButton = checkoutPopupBodyDiv.querySelector("#cash-button");
  let paypalButton = checkoutPopupBodyDiv.querySelector("#paypal-button");

  let order;

  cashButton.addEventListener("click", function () {
    order = extractFromCheckoutForms(checkoutPopupBodyDiv, "cash");
    let popup = document.getElementById("popup");
    popup = unassignClosePopupListener(popup);
    popup = assignClosePopupRefreshListener(popup);
    postJSON('orders/verify_customer', order).then(res => {
      let deliveryDet = res.details.customer.deliveryDetails;
      let delList = addressToString(deliveryDet);
      let customerDet = res.details.customer.customerDetails;
      if(res.success) {
        let object = { success: true };
        let checkoutLeft = popup.querySelector("#checkout-left");
        let checkoutPaymentButtons = popup.querySelector("#checkout-payment-buttons");
        let customerFormsContainer = popup.querySelector("#customer-forms");
        checkoutPaymentButtons.parentNode.removeChild(checkoutPaymentButtons);
        customerFormsContainer.parentNode.removeChild(customerFormsContainer);
        postJSON('orders/order_confirmed', object);
        getHTML('components/checkout_confirmation.html').then(lay => {
          let confirmationDiv = lay.cloneNode(true);
          let paypalPaymentP = confirmationDiv.querySelector("#checkout-confirmation-paypal-payment");
          paypalPaymentP.parentNode.removeChild(paypalPaymentP);
          let addressP = confirmationDiv.querySelector("#checkout-confirmation-address");
          addressP.innerHTML += customerDet.firstname + " " + customerDet.surname;
          for(let i = 0; i < delList.length; i++) {
            addressP.innerHTML += "<br />";
            addressP.innerHTML += delList[i];
          }
          let emailSpan = confirmationDiv.querySelector("span#checkout-confirmation-email");
          emailSpan.innerText = customerDet.email;
          checkoutLeft.appendChild(confirmationDiv);
        });
      }
      else {
        getHTML('components/delivery_fail.html').then(lay => {
          let popupBody = popup.querySelector("#popup-body");
          let popupBodyDivOld = popup.querySelector("#popup-body-container");
          popupBodyDivOld.parentNode.removeChild(popupBodyDivOld);
          let popupBodyDiv = lay.cloneNode(true);
          let addressP = popupBodyDiv.querySelector("#delivery-fail-address");
          addressP.innerHTML += customerDet.firstname + " " + customerDet.surname;
          for(let i = 0; i < delList.length; i++) {
            addressP.innerHTML += "<br />";
            addressP.innerHTML += delList[i];
          }
          let milesSpan = popupBodyDiv.querySelector("#miles-from-base");
          milesSpan.innerText = priceToString(res.distance);
          popupBody.appendChild(popupBodyDiv);
        });
      }
    });
  });

  paypalButton.addEventListener("click", function () {
    order = extractFromCheckoutForms(checkoutPopupBodyDiv, "paypal");
    postJSON('orders/verify_order', order).then(res => {
      if(res.success) {
        console.loh("not yet");
      }
      else {
        console.log("no 2");
      }
    });
  });

  return checkoutPopupBodyDiv;
}

function extractFromCheckoutForms(checkoutPopupBodyDiv, payment) {
  let firstnameDiv = checkoutPopupBodyDiv.querySelector("input[name='fname']");
  let surnameDiv = checkoutPopupBodyDiv.querySelector("input[name='sname']");
  let emailDiv = checkoutPopupBodyDiv.querySelector("input[name='email']");
  let addr1Div = checkoutPopupBodyDiv.querySelector("input[name='1addr']");
  let addr2Div = checkoutPopupBodyDiv.querySelector("input[name='2addr']");
  let townDiv = checkoutPopupBodyDiv.querySelector("input[name='town']");
  let countyDiv = checkoutPopupBodyDiv.querySelector("input[name='county']");
  let postcodeDiv = checkoutPopupBodyDiv.querySelector("input[name='postcode']");
  let totalPriceDiv = checkoutPopupBodyDiv.querySelector("#checkout-total-amount-container .amount span");

  let payload = {
    customer: {
      customerDetails: {
        firstname: firstnameDiv.value,
        surname: surnameDiv.value,
        email: emailDiv.value
      },
      deliveryDetails: {
        addr1: addr1Div.value,
        addr2: addr2Div.value,
        town: townDiv.value,
        county: countyDiv.value,
        postcode: postcodeDiv.value
      }
    },
    order: {
      paymentMethod: payment,
    }
  };

  return payload;
}

function addressToList(delDet) {

}

function addressToString(delDetails) {
  let delList = [];
  for(let i = 0; i < Object.keys(delDetails).length; i++) {
    if(delDetails[Object.keys(delDetails)[i]] != "") {
      delList.push(delDetails[Object.keys(delDetails)[i]])
    }
  }
  return delList;
}
