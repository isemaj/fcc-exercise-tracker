"use strict";

const shortid = require("shortid");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  _id: {
    type: String,
    default: shortid.generate
  },
})

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", usersSchema);