const fetch = require("node-fetch");

const location = require('../../config/location');
const apis = require('../../config/apis');


const checkDistance = async(toAddressObj) => {
  const latlonFrom = location.originLatLon;
  const toAddress = await addressToString(toAddressObj);
  const toURL =
    "https://geocoder.ls.hereapi.com/6.2/geocode.json" +
    "?apiKey=" + apis.here +
    "&searchtext=" + toAddress;
  let latlonTo = fetch(toURL)
    .then(res => res.json())
    .then(res => res.Response.View[0].Result[0].Location.NavigationPosition[0])
    .catch(err => {return err});
  return Promise.all([latlonFrom, latlonTo]).then(res => {
    if(res[1].Longitude && res[1].Latitude) {
      const url =
      "https://route.ls.hereapi.com/routing/7.2/calculateroute.json" +
      "?apiKey=" + apis.here +
      "&waypoint0=geo!" + res[0].Latitude + "," + res[0].Longitude +
      "&waypoint1=geo!" + res[1].Latitude + "," + res[1].Longitude +
      "&mode=shortest;pedestrian";
      return fetch(url)
      .then(dis => dis.json())
      .then(dis => dis.response.route[0].summary.distance)
      .catch(err => {return err})
      .then(dis => dis * 0.000621)
      .then(dis => {
        return {
          latitude: res[1].Latitude,
          longitude: res[1].Longitude,
          distance: dis
        };
      })
      .catch(err => {return err});
    }
    else return new Error();
  });
}

const addressToString = async(delDetails) => {
  let delString = "";
  for(let i = 0; i < Object.keys(delDetails).length; i++) {
    if(delDetails[Object.keys(delDetails)[i]] != "") {
      if(i != 0) {
        delString += "+"
      }
      delString += delDetails[Object.keys(delDetails)[i]].replace(/ /g, "+");
    }
  }
  return delString;
}

module.exports = {
  checkDistance
}
