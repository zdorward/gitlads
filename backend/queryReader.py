from flask import Flask, redirect, url_for, render_template, request
import json
import sqlite3
import os
import geopy
import geocoder
from geopy.geocoders import Nominatim

def grabData(l,s):
    connection = sqlite3.connect("data.db")
    cursor = connection.cursor()
    SQLdata = []

    l = l.replace(' ', '')
    for row in cursor.execute("select * from " + l):
            SQLdata.append(row)
    connection.close()
    
    if (s == "Flights"):
        temp = SQLdata[0][0].split()
    elif (s == "Hotels"):
        temp = SQLdata[0][1].split()
    else:
        temp = SQLdata[0][2].split()
    
    info = {l + " - " + s: temp}

    return (info)


app = Flask(__name__) 

#Location = root, query = topic
@app.route("/location", methods = ['GET'])
def information():
    location = request.args.get('location')
    selection = request.args.get('selection')

    return (grabData(location,selection))

@app.route("/userLocation", methods = ['GET'])
def getLocation():
    g = geocoder.ip('me')

    geolocator = Nominatim(user_agent="geoapiExercises")
    Latitude = str(g.latlng[0])
    Longitude = str(g.latlng[1])

    location = geolocator.reverse(Latitude+","+Longitude)
    address = location.raw['address']
    return (address['city'] + ", " + address['state'])

app.run(port = 3001)