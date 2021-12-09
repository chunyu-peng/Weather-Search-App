const express = require('express');

const app = express();

const request = require("request");

const path = require('path');

app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.get('/api/products/autocomplete', (req, res, next) => {
  let citybox = req.query.city;
  request({
    url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + citybox + "&types=%28cities%29&components=country:us&key=AIzaSyB_b0epYhWcyachc5ndOGEDJIgkH0P2unw",
    method:'GET',
    },function(error,response,body){
        if(!error && response.statusCode==200){
            let autocompleteResult = JSON.parse(body);
            res.json(autocompleteResult);
        }
        else{
          res.json("failed");
        }
    });
});

app.get('/api/products/tomorrow', (req, res, next) => {
  let checkbox = req.query.checkbox;
  let fields = "temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime,visibility,moonPhase,cloudCover";
  let timesteps = "current,1d,1h";
  let timezone = "America/Los_Angeles";
  if (checkbox == "true") {
    let locbox = req.query.loc;
    let autocitybox = req.query.autocity;
    let regionbox = req.query.region;
    let combLoc = (autocitybox + ", " + regionbox).replace("+", " ");
    request({
      url: "https://api.tomorrow.io/v4/timelines?location=" + locbox + "&fields=" + fields + "&timesteps=" + timesteps + "&timezone=" + timezone + "&units=imperial&apikey=OkD8KkNPKQaRr9fVCXGhIo8JtWIYEF6J",
      method:'GET',
      },function(error,response,body){
          if(!error && response.statusCode==200){
            let tomoResult = JSON.parse(body);
            let combResult = {
              "title": combLoc,
              "result": tomoResult,
              "loc": locbox
            }
            res.json(combResult);
          }
          else{
            res.json("failed");
          }
      });
    }
  else {
    let streetbox = req.query.street;
    let citybox = req.query.city;
    let statebox = req.query.state;
    let address = streetbox.toString().replace(" ", "+") + ",+" + citybox.toString().replace(" ", "+") + ",+" + statebox;
    request({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyB_b0epYhWcyachc5ndOGEDJIgkH0P2unw",
      method:'GET',
      },function(error,response,body){
          if(!error && response.statusCode==200){
            let geoResult = JSON.parse(body);
            let geoLoc = geoResult["results"][0]["geometry"]["location"];
            let locParam = geoLoc["lat"] + "," + geoLoc["lng"];
            request({
              url: "https://api.tomorrow.io/v4/timelines?location=" + locParam + "&fields=" + fields + "&timesteps=" + timesteps + "&timezone=" + timezone + "&units=imperial&apikey=OkD8KkNPKQaRr9fVCXGhIo8JtWIYEF6J",
              method:'GET',
              },function(error,response,body){
                  if(!error && response.statusCode==200){
                    let tomoResult = JSON.parse(body);
                    let formattedAddress = geoResult["results"][0]["formatted_address"];
                    let formattedCity = formattedAddress.split(", ")[formattedAddress.split(", ").length - 3];
                    let formattedState = formattedAddress.split(", ")[formattedAddress.split(", ").length - 2];
                    let combLoc = formattedCity.replace(/[^a-zA-Z ]/g, "") + ", " + formattedState.replace(/[^a-zA-Z]/g, "");
                    let combResult = {
                      "title": combLoc,
                      "result": tomoResult,
                      "loc": locParam
                    }
                    res.json(combResult);
                  }
                  else{
                    res.json("failed");
                  }
              });
          }
      });
  }
});

app.use((req, res, next) => {
  res.sendFile(__dirname, 'angular', 'index.html');
});

module.exports = app;
