"use strict";

const shortid = require("shortid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// function validator (val) {
//   console.log(this.model("Users").countDocuments({username: val}, function(err, count) {
//     if (err) {
//       return err;
//     }
//     console.log(count)
//   }))
//   console.log(val)
// };

// const customValidator = [validator, "Oh oh"]

// const usersSchema = new Schema({
//   username: {
//     type: String,
//     validate: customValidator,
//     // unique: true,
//     // index: true,
//     required: true
//   },
//   _id: {
//     type: String,
//     default: shortid.generate
//   },
// })

const usersSchema = new Schema({
  username: {
    type: String,
    // unique: true,
    // index: true,
    required: true
  },
  _id: {
    type: String,
    default: shortid.generate
  },
})

usersSchema.pre("save", function(next) {
  const self = this;
  mongoose.model("Users").find({ username: self.username}, function(err, result){
    if(err) {
      next(err);
    } else if(result) {
      // console.log(result);
      self.invalidate("username", "Username already exist");
      next(new Error("Username already exist"))
    } else {
      next();
    }
  })
})

module.exports = mongoose.model("Users", usersSchema);