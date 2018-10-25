"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  // userId
  // description
  // duration
  // date 
  // name (username)

const exerciseSchema = new Schema({

})

module.exports = mongoose.model("Exercise", exerciseSchema);