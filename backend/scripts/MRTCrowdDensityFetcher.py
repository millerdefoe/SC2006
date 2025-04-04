import requests
import os
import argparse
import time
from datetime import datetime
from dateutil.parser import parse

from lib.Python.Database.Database import Database
from lib.Python.Helper.HelperFunctions import loadDatabaseCredentials
from lib.Python.Helper.HelperFunctions import getPCDAPIKey
from lib.Python.Logging.PythonLogger import PythonLogger

logger = PythonLogger(os.path.basename(__file__))

databaseCredsPath = os.path.join(".", "creds", "priv", "database.json")
pcdKeyPath = os.path.join(".", "creds", "priv", "lta.json")
databaseCreds = loadDatabaseCredentials(databaseCredsPath)
pcdKey = getPCDAPIKey(pcdKeyPath)

dbObj = Database(
    databaseCreds["host"],
    databaseCreds["database"],
    databaseCreds["username"],
    databaseCreds["password"],
    databaseCreds["port"]
)

url = "https://datamall2.mytransport.sg/ltaodataservice/PCDRealTime" #Note: Only station number, no station name
trainLine = ['CCL', 'CEL', 'CGL', 'DTL', 'EWL', 'NEL', 'NSL', 'BPL', 'SLRT', 'PLRT', 'TEL']

headers = {
            "AccountKey" : pcdKey,
            "Accept" : "application/json"
        }

parser = argparse.ArgumentParser()
parser.add_argument('-d', '--getMRTCongestionLevel', help='Updates MRT Congestion Levels into database depending on value of "refresh"', default=False, action='store_true')
args = parser.parse_args()

#Real time update of 600s interval for congestion levels
if args.getMRTCongestionLevel:
    timeNow = datetime.now()

    for i in trainLine:
        param = "TrainLine={}".format(i)
        requestUrl = url + "?" + param
        #print(requestUrl)
        logger.debug("Querying LTA api for MRT Congestion Levels with skip of {}".format(i))
        response = requests.get(requestUrl, headers=headers)
        print(response.json())
        for x in response.json()["value"]:

            starttime = x["StartTime"]
            endtime = x["EndTime"]  

            #StartTime & EndTime for debugging purposes 
            starttime = parse(starttime).strftime("%Y-%m-%d %H:%M:%S") #Converts into a form for databases
            endtime = parse(endtime).strftime("%Y-%m-%d %H:%M:%S")

            values = [x["StartTime"], x["EndTime"], x["CrowdLevel"], x["Station"] ]

            insertStatement = "UPDATE mrtcongestionlevel SET starttime = %s, endtime = %s, mrtcongestionlevel = %s WHERE stationnumber = %s"

            if dbObj.writeData(insertStatement, values) == False:
                logger.error("Error inserting data with statement {} and values {}".format(insertStatement, values))