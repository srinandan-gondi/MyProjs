const express = require("express");
const app = express();
const db = require("./db");


const cors = require("cors");

app.use(cors());
app.use(express.json());

const userFunc = require("./User.js");
app.use("/user", userFunc);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Import the chatbot route
const chatbotRoute = require('./ChatBotRouter.js');

// Use the chatbot route middleware
app.use('/', chatbotRoute);

// Other routes and middleware configurations can follow

// Start the Express server
const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
