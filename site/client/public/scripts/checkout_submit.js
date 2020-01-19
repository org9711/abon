function addPayButtonEventListeners(checkoutPopupBodyDiv) {
  let cashButton = checkoutPopupBodyDiv.querySelector("#cash-button");
  let paypalButton = checkoutPopupBodyDiv.querySelector("#paypal-button");

  let order;

  cashButton.addEventListener("click", function () {
    order = extractFromCheckoutForms(checkoutPopupBodyDiv, "cash");
    let popup = document.getElementById("popup");
    popup = unassignClosePopupListener(popup);
    popup = assignClosePopupRefreshListener(popup);
    let checkoutLeft = popup.querySelector("#checkout-left");
    let checkoutPaymentButtons = popup.querySelector("#checkout-payment-buttons");
    checkoutPaymentButtons.parentNode.removeChild(checkoutPaymentButtons);
    postJSON('orders/verify_customer', order).then(res => {
      if(res.success) {
        let customerFormsContainer = popup.querySelector("#customer-forms");
        customerFormsContainer.parentNode.removeChild(customerFormsContainer);
        getHTML('components/checkout_confirmation.html').then(lay => {
          let paypalPaymentP = lay.querySelector("#checkout-confirmation-paypal-payment");
          paypalPaymentP.parentNode.removeChild(paypalPaymentP);
          let customerDet = res.details.customer.customerDetails;
          let deliveryDet = res.details.customer.deliveryDetails;
          let delList = addressToString(deliveryDet);
          let addressP = lay.querySelector("#checkout-confirmation-address");
          addressP.innerHTML += customerDet.firstname + " " + customerDet.surname;
          for(let i = 0; i < delList.length; i++) {
            addressP.innerHTML += "<br />";
            addressP.innerHTML += delList[i];
          }
          let emailSpan = lay.querySelector("span#checkout-confirmation-email");
          emailSpan.innerText = customerDet.email;
          checkoutLeft.appendChild(lay);
        });
      }
      else {
        getHTML('components/checkout_fail.html').then(lay => {
          let basketOverview = popup.querySelector("#basket-overview");
          basketOverview.parentNode.removeChild(basketOverview);
          checkoutLeft.parentNode.removeChild(checkoutLeft);
          let checkoutMainBody = popup.querySelector("#checkout-main");
          checkoutMainBody.appendChild(lay);
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
