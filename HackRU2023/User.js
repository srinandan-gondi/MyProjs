const express = require("express");
const db = require("./db");

const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());



router.post ("/", (req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const email = req.body.email;
    const DOB = req.body.DOB;
    
    db.query("INSERT INTO users (email, DOB, password, firstname, lastname) VALUES (?, ?, ?, ?, ?);", 
     [email, DOB, password, firstname, lastname],
     (err, results) => {
        if(!err){
            res.send(results);
            console.log(results);
        }
        else{
            res.send(err);
        }
        
    })
});

router.post ("/login", (req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const email = req.body.email;
    
    db.query("SELECT * FROM users WHERE firstname = ? AND lastname = ? AND email = ? AND password = ?;", 
     [firstname,lastname, email, password],
     (err, results) => {
        if(err){
            console.log(err);
        }
        else if(results.length > 0){
            
            console.log(results);
            console.log(results[0]);
            console.log(res);
            
            if(firstname === results[0].firstname && lastname === results[0].lastname && email === results[0].email && password === results[0].password){
                res.json({loginStatus: true, firstname: firstname, password: password, lastname:lastname, email:email, DOB: results[0].DOB, message: "Successfully logged in!"})
                
            }
        }
        
        
      }   
    );
});


  


router.get("/", (req, res) => {
    
    // db.connect(function(err) {
    //     if (err) {
    //       return console.error('error: ' + err.message);
    //     }
    //     db.query("SELECT * FROM users WHERE firstname = ? AND lastname = ? AND email = ? AND password = ?;"
    //     )
    //     // console.log('Connected to the MySQL server.');
    //   });
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const email = req.body.email;
    
    db.query("SELECT * FROM users WHERE firstname = ? AND lastname = ? AND email = ? AND password = ?;",
    [firstname,lastname, email, password],
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