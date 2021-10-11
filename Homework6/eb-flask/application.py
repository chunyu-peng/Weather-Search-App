from flask import Flask, request, jsonify
import json
import requests

application = Flask(__name__, static_url_path='')


@application.route('/')
def application_init():
    return application.send_static_file("weather.html")


@application.route('/process', methods=["GET"])
def process():
    if request.method == "GET":
        user_input = request.args
        check = user_input.get("checkbox")
        if check == "on":
            loc = user_input.get("autolocation")
            city = user_input.get("autocity")
            region = user_input.get("autoregion")
            country = user_input.get("autocountry")
            result = tomorrow_api(loc)
            card_loc = (str(city) + ", " + str(region) + ", " + str(country)).replace("+", " ")
        else:
            street = user_input.get("streetname")
            city = user_input.get("cityname")
            state = user_input.get("statename")
            geo_json = google_geocoding(street, city, state)
            loc = geo_json.get("results")[0].get("geometry").get("location")
            locparam = str(loc.get("lat")) + "," + str(loc.get("lng"))
            result = tomorrow_api(locparam)
            card_loc = geo_json.get("results")[0].get("formatted_address")
        comb = {
            "result": result,
            "card_loc": card_loc
        }
        return jsonify(comb=comb)
    return application.send_static_file("weather.html")


@application.route('/google_geocoding')
def google_geocoding(street, city, state):
    address = str(street).replace(" ", "+") + ",+" + str(city).replace(" ", "+") + ",+" + str(state)
    url = "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=AIzaSyDGKIpymjRxuwfAYQKOQPKOQ4xcX9qyh4Q".format(address)
    req = requests.get(url)
    geo_json = json.loads(req.text)
    return geo_json


@application.route('/tomorrow_api')
def tomorrow_api(locparam):
    fields = "temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity," \
             "pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime," \
             "visibility,moonPhase,cloudCover"
    timesteps = "current,1d,1h"
    timezone = "America/Los_Angeles"
    url = "https://api.tomorrow.io/v4/timelines?location={}&fields={}&timesteps={}&timezone={}&units=imperial&apikey=OkD8KkNPKQaRr9fVCXGhIo8JtWIYEF6J".format(locparam, fields, timesteps, timezone)
    req = requests.get(url)
    weather_json = json.loads(req.text)
    return weather_json


if __name__ == '__main__':
    application.run()
