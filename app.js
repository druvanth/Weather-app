const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
   const qurey = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=85d8770365d6ac634a56c0a38dc700f1&q="+ qurey +"&units=metric&mode=XML"
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      //console.log(data);
      const weatherData = JSON.parse(data);
      const temp = (weatherData.main.temp);
      const des = (weatherData.weather[0].description);
      const icon = weatherData.weather[0].icon;
      res.write("<p> the weather is currently " + des +".");
      res.write("<h1>The temp in " + qurey +" is " + temp + " degrees celcius!</h1>");
      const imageURL = "http://openweathermap.org/img/wn" + icon + "@2x.png"
      res.write("<img src =" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("runnig!");
});
