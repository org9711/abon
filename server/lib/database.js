const mongoose = require('mongoose');

const Product = require('../models/product');


module.exports = {
  resetData: function() {
    removeAll();
    addProducts();
  }
}

function removeAll() {
  Product.removeAllProducts()
    .then(res => console.log("successfully deleted: " + res))
    .catch(err => console.error("error deleting: " + err));
  }

function addProducts() {
  let names = ["Superfood Pesto", "Roasted Veg Curry", "Spicy Noodle Soup", "Aubergine & Tomato Pasta"];
  let prices = [2.2, 2.2, 2.2, 2.2];
  let image_names = ["superfood-pesto.jpg", "veg-curry.jpg", "spicy-noodles.jpg", "tomato-pasta.jpg"];
  let descriptions = [];
  descriptions.push("This pesto is as vibrant in colour as it is in flavour. It takes " +
    "inspiration from both Japanese and Italian cooking and fuses the best of " +
    "both cuisines. It''s full of spinach, edamame beans, garlic, coriander, " +
    "chilli and much more. It also has a bit of white miso which is really " +
    "good for you and adds a brilliant umami funk to the dish. As it''s a " +
    "fusion dish you can get away serving it with pasta or noodles. We " +
    "prefer it with conchiglie, which catches brilliant little puddles of " +
    "sauce.");
  descriptions.push("The roasted veg curry is packed full of the good stuff. It includes " +
    "butternut squash, sweet potato, peppers, mushrooms and tons of " +
    "other veg that will make you feel as good as it tastes. Pimp yours " +
    "at home with extra chilli if you like it spicy, or just enjoy the " +
    "zing from all the spices, lime and coriander.");
  descriptions.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla " +
    "tincidunt augue sit amet odio viverra tincidunt. Morbi tellus massa, " +
    "faucibus in enim eget, porta egestas dui. Orci varius natoque " +
    "penatibus et magnis dis parturient montes, nascetur  ridiculus mus. " +
    "Fusce sed mi vel neque tincidunt rhoncus. Vestibulum ante ipsum " +
    "primis in  faucibus orci luctus et ultrices posuere cubilia Curae; " +
    "Curabitur eu gravida augue. Praesent sit amet justo eu tellus " +
    "posuere maximus. Nullam volutpat, nisi in pretium facilisis, turpis " +
    "urna iaculis lorem, at commodo nibh nibh ut odio. Vestibulum et mi varius, " +
    "viverra neque vitae, eleifend justo.");
  descriptions.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla " +
    "tincidunt augue sit amet odio viverra tincidunt. Morbi tellus massa, " +
    "faucibus in enim eget, porta egestas dui. Orci varius natoque " +
    "penatibus et magnis dis parturient montes, nascetur  ridiculus mus. " +
    "Fusce sed mi vel neque tincidunt rhoncus. Vestibulum ante ipsum " +
    "primis in  faucibus orci luctus et ultrices posuere cubilia Curae; " +
    "Curabitur eu gravida augue. Praesent sit amet justo eu tellus " +
    "posuere maximus. Nullam volutpat, nisi in pretium facilisis, turpis " +
    "urna iaculis lorem, at commodo nibh nibh ut odio. Vestibulum et mi varius, " +
    "viverra neque vitae, eleifend justo.");
  let stocks = [6, 12, 0, 0];
  let display_positions = [1, 2, 3, 4];
  let statuses = ["on_sale", "on_sale", "sold_out", "coming_soon"];

  for(let i = 0; i < names.length; i++) {
    let newProduct = new Product({
      name: names[i],
      price: prices[i],
      image_name: image_names[i],
      description: descriptions[i],
      stock: stocks[i],
      display_position: display_positions[i],
      status: statuses[i]
    });

    Product.addProduct(newProduct)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
