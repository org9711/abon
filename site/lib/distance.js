const fetch = require("node-fetch");

module.exports = {
  checkAddressDistance: async function(baseAddress, toAddress) {
    let hereAPIkey = "eGJQg0yEBZLVZFew4FyoBOchLYSUcNxyScYaJZ6Nb5I";
    console.log(baseAddress);
    console.log(toAddress);
    const fromURL =
      "https://geocoder.ls.hereapi.com/6.2/geocode.json" +
      "?apiKey=" + hereAPIkey +
      "&searchtext=" + baseAddress;
    let latlonFrom = fetch(fromURL)
      .then(res => res.json())
      .then(res => res.Response.View[0].Result[0].Location.NavigationPosition[0])
      .catch(err => console.error(err));
    const toURL =
      "https://geocoder.ls.hereapi.com/6.2/geocode.json" +
      "?apiKey=" + hereAPIkey +
      "&searchtext=" + toAddress;
    let latlonTo = fetch(toURL)
      .then(res => res.json())
      .then(res => res.Response.View[0].Result[0].Location.NavigationPosition[0])
      .catch(err => console.error(err));
    return Promise.all([latlonFrom, latlonTo]).then(res => {
      const url =
        "https://route.ls.hereapi.com/routing/7.2/calculateroute.json" +
        "?apiKey=" + hereAPIkey +
        "&waypoint0=geo!" + res[0].Latitude + "," + res[0].Longitude +
        "&waypoint1=geo!" + res[1].Latitude + "," + res[1].Longitude +
        "&mode=shortest;pedestrian";
      return fetch(url)
        .then(res => res.json())
        .then(res => res.response.route[0].summary.distance)
        .then(res => res * 0.000621)
        .catch(err => console.error(err));
    });
  }
}
