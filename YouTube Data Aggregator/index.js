const express = require("express");
const path = require("path");
require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
const key = process.env.API_KEY;
const port = 1000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get("/", function (req,res){
  res.render("channelGetter");
});

app.post("/",getChannelData);


//Route Handlers
function getChannelData(req,res){
  const link = req.body.link || '';
  const handle = req.body.handle || '';  
  
  if(link.includes("@")){
    const handle1 = link.split("@")[1];

    try{
      axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${handle}&key=${key}`).then((response) => {
      
      // const title = response.data.items[0].snippet.title;
      // const subscriberCount = response.data.items[0].statistics.subscriberCount;
      if(response.data.items === undefined){
        console.log("wrong username/link!");
        res.render("error");
      } 
      else{
        console.log(response.data.items[0]); 
        console.log(response.data.items[0].snippet.description); 
        const title = response.data.items[0].snippet.title;
        res.render("channelGetter");
      } 
    });
  }
  catch(error){
    console.error(error.message);
  }
    }
  
}



//Starts Server
app.listen(port, function(error){

    if(error){
      console.log(error);
    }
    else{
      console.log(`I, the server, am listening at port ${port}`);
    }
    
})



