const express = require("express");
const path = require("path");
require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const {format} = require('date-fns/format');

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
async function getChannelData(req,res){
  const link = req.body.link || '';
  const handle = req.body.handle || '';  
  
  let passer = "";
  let parameter = "forHandle";

  if(handle != ''){
    passer = handle;
    parameter = "forHandle";
      try{
        axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CtopicDetails%2Cstatus%2CbrandingSettings%2CcontentOwnerDetails&${parameter}=${passer}&key=${key}`).then((response) => {
        
        
        if(response.data.items === undefined){
          console.log("wrong username/link!");
          res.render("error");
        } 
        else{
          console.log(response.data); 
          
            const title = response.data.items[0].snippet.title;
            const id = response.data.items[0].id;
            const description = response.data.items[0].snippet.description;
            const country = response.data.items[0].snippet.country;
            const creationDate = format(new Date(response.data.items[0].snippet.publishedAt), 'MM-dd-yyyy');
            const viewCount = response.data.items[0].statistics.viewCount;
            const subscriberCount = response.data.items[0].statistics.subscriberCount;
            const videoCount = response.data.items[0].statistics.videoCount;
  
            const avgViewsPerVideo = viewCount / videoCount;
  

          let usFormatter = new Intl.NumberFormat('en-US', { style: 'decimal' });
          
          const passData = {"title":title,"id":id,"description":description,"country":country,"creationDate":creationDate,"views":usFormatter.format(viewCount),"subscribers":usFormatter.format(subscriberCount),"videos":usFormatter.format(videoCount),"viewsPerVideo":usFormatter.format(Math.floor(avgViewsPerVideo))};
          res.render("channelDataDisplay",{passData});
        } 
      });
    }
    catch(error){
      console.error(error.message);
    }
  }
  else{
    let tracker = true;
    if(link === "https://www.youtube.com" || link === "www.youtube.com" || link === "youtube.com"){
      res.render("error");
    }
    else if(link.includes("youtube.com")){
      if(link.includes("@")){
        passer = link.split("@")[1];
        parameter = "forHandle";
      }
      else if(link.includes("/user/")){
        passer = link.split("user/")[1];
        parameter = "forUsername";
      }
      else if(link.includes("/c/")){
        passer = link.split("c/")[1];
        parameter = "forUsername";
      } 
      else if(link.includes("/channel/")){
        passer = link.split("channel/")[1];
        parameter = "id";
      }
      else{
        res.render("error");
        tracker = false;
      }
      
      if(tracker){
        try{
          axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&${parameter}=${passer}&key=${key}`).then((response) => {
          
          
          if(response.data.items === undefined){
            console.log("invalid username/link!");
            res.render("error");
          } 
          else{
            
            console.log(response.data); 
            
            const title = response.data.items[0].snippet.title;
            const id = response.data.items[0].id;
            const description = response.data.items[0].snippet.description;
            const country = response.data.items[0].snippet.country;
            const creationDate = format(new Date(response.data.items[0].snippet.publishedAt), 'MM-dd-yyyy');
            
            const viewCount = response.data.items[0].statistics.viewCount;
            const subscriberCount = response.data.items[0].statistics.subscriberCount;
            const videoCount = response.data.items[0].statistics.videoCount;
  
            const avgViewsPerVideo = viewCount / videoCount;
  
            let usFormatter = new Intl.NumberFormat('en-US', { style: 'decimal' });
            
            const passData = {"title":title,"id":id,"description":description,"country":country,"creationDate":creationDate,"views":usFormatter.format(viewCount),"subscribers":usFormatter.format(subscriberCount),"videos":usFormatter.format(videoCount),"viewsPerVideo":usFormatter.format(Math.floor(avgViewsPerVideo))};
      

            
            res.render("channelDataDisplay",{passData});
          } 
        });
      }
      catch(error){
        console.error(error.message);
      }
    }
      

    }
    else{
      res.render("error");
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


