"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  userId: {type: String},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: {type: Date}, // if no date specified, put the date now
  username: {type: String}
});

exerciseSchema.pre("save", function(next){
  // the `this` here refers to the query and the `exercise.username`
  mongoose.model("Users").findById(this.userId, (err, result) => {
    // `result` here is the document that match the `this.userId`
    if(err) return next(err);
    if(!this.date) {
      this.date = Date.now()
    }
    next();
  })
})

module.exports = mongoose.model("Exercise", exerciseSchema);