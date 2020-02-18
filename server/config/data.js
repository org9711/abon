module.exports = {
  products: [
    {
      name: "Superfood Pesto",
      price: 2.2,
      image_name: "superfood-pesto.jpg",
      description: "This pesto is as vibrant in colour as it is in flavour. It takes " +
        "inspiration from both Japanese and Italian cooking and fuses the best of " +
        "both cuisines. It''s full of spinach, edamame beans, garlic, coriander, " +
        "chilli and much more. It also has a bit of white miso which is really " +
        "good for you and adds a brilliant umami funk to the dish. As it''s a " +
        "fusion dish you can get away serving it with pasta or noodles. We " +
        "prefer it with conchiglie, which catches brilliant little puddles of " +
        "sauce.",
      stock: 12,
      display_position: 1,
      status: "on_sale"
    },
    {
      name: "Roasted Veg Curry",
      price: 2.2,
      image_name: "veg-curry.jpg",
      description: "The roasted veg curry is packed full of the good stuff. It includes " +
        "butternut squash, sweet potato, peppers, mushrooms and tons of " +
        "other veg that will make you feel as good as it tastes. Pimp yours " +
        "at home with extra chilli if you like it spicy, or just enjoy the " +
        "zing from all the spices, lime and coriander.",
      stock: 6,
      display_position: 2,
      status: "on_sale"
    },
    {
      name: "Spicy Noodle Soup",
      price: 2.2,
      image_name: "spicy-noodles.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla " +
        "tincidunt augue sit amet odio viverra tincidunt. Morbi tellus massa, " +
        "faucibus in enim eget, porta egestas dui. Orci varius natoque " +
        "penatibus et magnis dis parturient montes, nascetur  ridiculus mus. " +
        "Fusce sed mi vel neque tincidunt rhoncus. Vestibulum ante ipsum " +
        "primis in  faucibus orci luctus et ultrices posuere cubilia Curae; " +
        "Curabitur eu gravida augue. Praesent sit amet justo eu tellus " +
        "posuere maximus. Nullam volutpat, nisi in pretium facilisis, turpis " +
        "urna iaculis lorem, at commodo nibh nibh ut odio. Vestibulum et mi varius, " +
        "viverra neque vitae, eleifend justo.",
      stock: 0,
      display_position: 3,
      status: "sold_out"
    },
    {
      name: "Aubergine & Tomato Pasta",
      price: 2.2,
      image_name: "tomato-pasta.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla " +
        "tincidunt augue sit amet odio viverra tincidunt. Morbi tellus massa, " +
        "faucibus in enim eget, porta egestas dui. Orci varius natoque " +
        "penatibus et magnis dis parturient montes, nascetur  ridiculus mus. " +
        "Fusce sed mi vel neque tincidunt rhoncus. Vestibulum ante ipsum " +
        "primis in  faucibus orci luctus et ultrices posuere cubilia Curae; " +
        "Curabitur eu gravida augue. Praesent sit amet justo eu tellus " +
        "posuere maximus. Nullam volutpat, nisi in pretium facilisis, turpis " +
        "urna iaculis lorem, at commodo nibh nibh ut odio. Vestibulum et mi varius, " +
        "viverra neque vitae, eleifend justo.",
      stock: 0,
      display_position: 4,
      status: "coming_soon"
    }
  ],
  customers: [
    {
      customer_details: {
        firstname: "Oliver",
        surname: "Ryan-George",
        email: "org.9711@hotmail.co.uk"
      },
      address_details: {
        address: {
          line1: "35 Brighton Road",
          town: "Bristol",
          postcode: "BS6 6NU"
        },
        location: {
          latitude: 51.466984,
          longitude: -2.604737,
          distance: 1.4
        }
      }
    },
    {
      customer_details: {
        firstname: "Jimmy",
        surname: "Kebe",
        email: "jimmy.kebe35754@gmail.com"
      },
      address_details: {
        address: {
          line1: "Flat 1",
          line2: "39 Park Street",
          town: "Bristol",
          postcode: "BS1 5NH"
        },
        location: {
          latitude: 51.453899,
          longitude: -2.602184,
          distance: 0.7
        }
      }
    },
    {
      customer_details: {
        firstname: "Andy",
        surname: "Griffin",
        email: "andy.griffin8943@hotmail.com"
      },
      address_details: {
        address: {
          line1: "704F Waverley House",
          line2: "Queen Charlotte Street",
          town: "Bristol",
          postcode: "BS1 1WH"
        },
        location: {
          latitude: 51.44956,
          longitude: -2.60292,
          distance: 0.9
        }
      }
    },
    {
      customer_details: {
        firstname: "Ezra",
        surname: "Furman",
        email: "ezra.furman786798@yahoo.com"
      },
      address_details: {
        address: {
          line1: "65 Jacob Wells Road",
          town: "Bristol",
          postcode: "BS8 1DJ"
        },
        location: {
          latitude: 51.454128,
          longitude: -2.610126,
          distance: 1.1
        }
      }
    }
  ],
  orders: [
    {
      units: [
        {
          productId: 0,
          quantity: 2,
          price: 4.4
        },
        {
          productId: 1,
          quantity: 1,
          price: 2.2
        },
        {
          productId: 2,
          quantity: 1,
          price: 2.2
        }
      ],
      customer: 0,
      payment: {
        method: "cash",
        status: "paid"
      },
      timestamps: {
        time_initiated: new Date("2019-12-20 17:05:30"),
        time_customer_submitted: new Date("2019-12-20 17:07:22"),
        time_ordered: new Date("2019-12-20 17:07:22"),
        time_acknowledged: new Date("2019-12-20 19:29:48"),
        time_prepared: new Date("2019-12-21 14:34:16"),
        time_delivered: new Date("2019-12-22 11:56:35")
      },
      status: {
        stage: "delivered",
        active: true
      }
    },
    {
      units: [
        {
          productId: 0,
          quantity: 4,
          price: 8.8
        },
        {
          productId: 2,
          quantity: 2,
          price: 4.4
        }
      ],
      customer: 0,
      payment: {
        method: "cash",
        status: "pending"
      },
      timestamps: {
        time_initiated: new Date("2020-01-03 12:24:27"),
        time_customer_submitted: new Date("2020-01-03 12:26:48"),
        time_ordered: new Date("2020-01-03 12:26:48"),
        time_acknowledged: new Date("2020-01-04 10:22:28"),
        time_prepared: new Date("2020-01-04 15:51:08")
      },
      status: {
        stage: "prepared",
        active: true
      }
    },
    {
      units: [
        {
          productId: 1,
          quantity: 3,
          price: 6.6
        },
        {
          productId: 2,
          quantity: 1,
          price: 2.2
        }
      ],
      customer: 2,
      payment: {
        method: "paypal",
        status: "paid"
      },
      timestamps: {
        time_initiated: new Date("2020-01-05 20:45:21"),
        time_customer_submitted: new Date("2020-01-05 20:47:00"),
        time_ordered: new Date("2020-01-05 20:49:22"),
        time_acknowledged: new Date("2020-01-07 21:49:48")
      },
      status: {
        stage: "acknowledged",
        active: true
      }
    },
    {
      units: [
        {
          productId: 2,
          quantity: 5,
          price: 11
        }
      ],
      customer: 3,
      payment: {
        method: "cash",
        status: "pending"
      },
      timestamps: {
        time_initiated: new Date("2020-01-11 09:11:12"),
        time_customer_submitted: new Date("2020-01-11 10:02:56"),
        time_ordered: new Date("2020-01-11 10:02:56")
      },
      status: {
        stage: "ordered",
        active: true
      }
    }
  ]
}
