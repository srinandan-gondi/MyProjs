const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");

const port = 1000;

app.use(cors());
app.use(express.json());


const userFunc = require("./routes/user.js");
app.use("/user", userFunc);

const uploadFunc = require("./routes/upload.js");
app.use("/user", uploadFunc);


app.listen(port, function (req,res){
    console.log(`I, the server, am running at port${port}`)
});



