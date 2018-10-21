const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

const app = express();

const MongoClient = mongo.MongoClient;

const PORT = process.env.PORT || 9000;

const connectOption = {
  useNewUrlParser: true
} 

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv").config()
}

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, connectOption);

app.use(cors());
app.use(bodyParser.urlencoded({"extended": false}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// error middleware
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.sendStatus(500);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})