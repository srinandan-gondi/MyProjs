const express = require("express");
const db = require("../config/db");

const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());



router.post ("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    db.query("INSERT INTO users (username, password) VALUES (?, ?);", 
     [username, password],
     (err, results) => {
        res.send(results);
        console.log(results);
    })
});

router.post ("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    db.query("SELECT * FROM users WHERE username = ?;", 
     username,
     (err, results) => {
        if(err){
            console.log(err);
        }
        else if(results.length > 0){
            
            console.log(results);
            console.log(results[0]);
            console.log(res);
            
            if(password === results[0].password){
                res.json({loginStatus: true, username: username, password: password, message: "Successfully logged in!"})
                
            }
            else{
                res.json({loginStatus: false, message: "Wrong password!"})
            }
        }
        else{
            res.json({loginStatus: false, message: "User not registered!"})
        }
        
        
      }   
    );
});

router.post ("/upload", (req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const postedBy = req.body.postedBy;
    
    const answer = req.body.answer;


    db.query("INSERT INTO uploads (title, description, image, posted_by) VALUES (?, ?, ?, ?);", 
     [title, description, image, postedBy],
     (err, results) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(results);
            console.log(results);
        }
    })
    console.log(title);
    console.log(description);
    console.log(image);
    console.log(postedBy);
    
    console.log(answer);

});


router.get("/upload", (req, res) => {
    db.query("SELECT * FROM uploads;",
    (err, results) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(results);
            // console.log(results);
        }
    })
});

module.exports = router;




