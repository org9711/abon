addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getOrderLayout();
}

let orderLayout;

function getOrderLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeOrderLayout;
  q.open("GET", 'admin/orders/get_row_layout', true);
  q.send();
}

function storeOrderLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  orderLayout = el;
  getOrders();
}

function getOrders() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayOrders;
  q.open("GET", 'admin/orders/get_orders', true);
  q.send();
}

function displayOrders() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  orders = JSON.parse(this.responseText);
  for (let i = 0; i < orders.length; i++) {
    appendOrderToTable(orders[i]);
  }
}

function appendOrderToTable(order) {
  let ul = document.querySelector("table");
  let orderTag = orderLayout.cloneNode(true);

  let orderIdTag = orderTag.getElementsByClassName('pt-3-half order-id')[0];
  let orderCustomerTag = orderTag.getElementsByClassName('pt-3-half order-customer')[0];
  let orderProductTag = orderTag.getElementsByClassName('pt-3-half order-product')[0];
  let orderQuantityTag = orderTag.getElementsByClassName('pt-3-half order-quantity')[0];
  let orderDateTag = orderTag.getElementsByClassName('order-date')[0];
  let orderTimeTag = orderTag.getElementsByClassName('order-time')[0];
  let orderStatusTag = orderTag.getElementsByClassName('form-control order-status')[0];
  let confirmButton = orderTag.getElementsByClassName('btn btn-success btn-rounded confirmBtn btn-sm my-0')[0];
  let removeButton = orderTag.getElementsByClassName('btn btn-danger btn-rounded removeBtn btn-sm my-0')[0];

  let orderId = order.id;
  let orderCustomer = order.customer[0];
  let orderProduct = order.product[0];
  let orderQuantity = order.quantity;
  let orderStatus = order.status;
  let date = order.datetime.split(' ')[0];
  let time = order.datetime.split(' ')[1];
  console.log(date);
  console.log(time);
  console.log(date.split('-'));
  console.log(time.split(':'));
  dateSplit = date.split('-');
  timeSplit = time.split(':');
  for (let i = 0; i < dateSplit.length; i++) {
    if (dateSplit[i].length == 1) {
      dateSplit[i] = '0' + dateSplit[i];
    }
  }
  for (let i = 0; i < timeSplit.length; i++) {
    if (timeSplit[i].length == 1) {
      timeSplit[i] = '0' + timeSplit[i];
    }
  }
  let orderDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
  let orderTime = timeSplit[0] + ':' + timeSplit[1];

  let preselectedOption = orderStatusTag.getElementsByClassName('order-status-' + orderStatus)[0];
  preselectedOption.selected = true;

  orderIdTag.innerText = orderId;
  orderCustomerTag.innerText = orderCustomer.id + ': ' + orderCustomer.firstname + '\n' +
  orderCustomer.email + '\n' +
  orderCustomer.addressLine1 + '\n' + orderCustomer.postcode;
  orderProductTag.innerText = orderProduct.id + ': ' + orderProduct.name + ' (£' + orderProduct.price.toFixed(2) + ')';
  orderQuantityTag.innerText = orderQuantity;
  orderDateTag.innerText = orderDate;
  orderTimeTag.innerText = orderTime;

  confirmButton.addEventListener("click", function() {
    let statusTag = findSelectedOption(orderStatusTag);
    let orderObj = {
      id: orderId,
      status: statusEncoding(statusTag.innerText),
    };
    let q = new XMLHttpRequest();
    q.open("POST", 'admin/orders/update_order', true);
    q.send(JSON.stringify(orderObj));
  });

  order = orderTag.firstElementChild;

  removeButton.addEventListener("click", function() {
    ul.removeChild(order);
    let orderObj = {
      id: orderId
    };
    let q = new XMLHttpRequest();
    q.open("POST", 'admin/orders/remove_order', true);
    q.send(JSON.stringify(orderObj));
  });

  ul.append(order);
}

function findSelectedOption(selector) {
  for (let i = 0; i < selector.children.length; i++) {
    if (selector.children[i].selected) {
      return selector.children[i];
    }
  }
}

function statusEncoding(status) {
  switch (status) {
    case 'Completed':
      return 1;
    case 'Pending':
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
  pageHeading = header.getElementsByClassName("ordersHeader")[0];
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
