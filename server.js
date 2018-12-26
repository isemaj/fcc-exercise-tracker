const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const routes = require("./routers/routes");

const MongoClient = mongoose.MongoClient;

const PORT = process.env.PORT || 9000;

const connectOption = {
  useNewUrlParser: true,
  autoIndex: false
}

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv").config()
}

const mongoURI = process.env.NODE_ENV !== "production" ? `${process.env.MONGODB_URI_DEV}${process.env.DB}` : process.env.MONGODB_URI;
mongoose.connect(mongoURI, connectOption)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// CORS, body parser, and express static middleware
app.use(cors());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Routes middleware
app.use("/api/exercise", routes);

// Error Handling middleware
app.use((err, req, res, next) => {
  res.send(err.message);
  // res.status(err.status).send(err.message);
  // res.send(err.errors);
  // res.type("txt").send(err.errors);
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
