from flask import Flask, render_template, request
import requests, os, openai
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

reqData = 0

@app.route("/",methods=["GET","POST"])
def index():
    if request.method == "POST":
        place = request.form.get("place","")
        APIurl = "http://api.weatherapi.com/v1/current.json?key=f7de5bb84140423c98792318230906&q={}&aqi=yes"
        response1 = requests.get(APIurl.format(place)).json()
        #print(response1)
        data1 = {'name': response1["location"]["name"], 'region': response1["location"]["region"], 'country': response1["location"]["country"], "weatherDescription": response1["current"]["condition"]["text"],
                "weatherIcon":response1["current"]["condition"]["icon"], "temperature":response1["current"]["temp_c"], "AQI":response1["current"]["air_quality"]["us-epa-index"], "latitude":response1["location"]["lat"],
                "longitude":response1["location"]["lon"]}
        reqData = data1["AQI"]
        

        response2 = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(place),
            max_tokens=300,
            temperature=0.6,
        )
        #print(type(response2["choices"][0]["text"]))
        

        
        
        return render_template("withData.html", data1=data1,data2 = response2["choices"][0]["text"].split("."))
        
    
    return render_template("index.html")

def generate_prompt(place):
    return """Give me a detailed list of things that people can safely do in {}, given the AQI {}.""".format(place.capitalize(), reqData)



    