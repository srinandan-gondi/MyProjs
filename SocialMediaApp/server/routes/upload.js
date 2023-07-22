const express = require("express");
const db = require("../config/db");

const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());



router.post ("/upload", (req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const postedBy = req.body.postedBy;
    
    const answer = req.body.answer;

    // db.connect();
    db.query("INSERT INTO uploads (title, description, image, posted_by) VALUES (?, ?, ?, ?);", 
     [title, description, image, postedBy],
     (err, results) => {
        res.send(results);
        console.log(results);
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
        res.send(results);
    })
});

module.exports = router;        
        