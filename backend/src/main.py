from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request

import json
import os

import requests

from lib.Python.Logging.PythonLogger import PythonLogger
from lib.Python.Helper.HelperFunctions import getGoogleMapAPIKey

logger = PythonLogger(os.path.basename(__file__))

app = Flask(__name__)
CORS(app)

apiKeyPath = os.path.join(".", "creds", "priv", "googleMapApi.json")
googleApiKey = getGoogleMapAPIKey(apiKeyPath)

@app.route("/heartbeat", methods=["GET", "POST"])
def heartbeat():

    logger.debug("Heartbeat API called")
    return jsonify({"heartbeat" : "ok"}), 200

# Placeholder function without proper class/module structure
@app.route("/getBasicRoute", methods=["GET", "POST"])
def getBasicRoute():

    logger.info("Getting route directly from google map API")

    try:
        source = request.get_json()["source"]

    except:
        return {"error": "No source was specified"}, 400

    try:
        destination = request.get_json()["destination"]

    except:
        return {"error": "No destination was specified"}, 400

    logger.info("Source of route: {}. Destination of route: {}. Travel mode: Drive. Routing preference: Traffice_Aware".format(source, destination))

    url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    bodyData = {
        "origin": {
            "address": source
            },
        "destination": {
            "address": destination
            },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
    }


    headers = {
        "X-Goog-Api-Key" : googleApiKey,
        "X-Goog-FieldMask" : "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        "Content-Type" : "application/json"
    }

    logger.debug("Sending request to google map api")
    logger.debug("Body: {}".format(bodyData))
    logger.debug("Headers: {}".format(headers))

    try:
        response = requests.post(url, json = bodyData, headers = headers)
    
    except:
        return {"error": "Error retrieving route from google api"}, 400

    logger.debug("Response received. Decoding google map api response into dictionary for parsing")

    responseData = response.json()

    if "routes" not in responseData or not responseData["routes"]:
        logger.error("Google Maps API returned no routes. Full response: {}".format(responseData))
        return {"error": "No routes found for this origin/destination"}, 400

    encodedPolyline = responseData["routes"][0]["polyline"]["encodedPolyline"]
    duration = responseData["routes"][0]["duration"]
    distance = responseData["routes"][0]["distanceMeters"]

    returnData = {
        "polyline" : encodedPolyline,
        "duration" : duration,
        "distance" : distance
    }

    logger.info("Returning data {} with status code 200".format(returnData))

    return returnData, 200

if __name__ == "__main__":
    app.run()