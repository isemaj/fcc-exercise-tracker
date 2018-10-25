const Users = require("../models/users");
const Exercise = require("../models/exercises");

const router = require("express").Router();

router.post("/new-user", (req, res, next) => {
  const user = new Users(req.body);
  user.save((err, enteredUser) => {
    if(err) {
      console.log(err)
      return next({
        status: 11000,
        message: "username already taken"
      })
      // return next(err.message)
      // console.log(err)
      // if(err.code == 11000) {
      //   return next({
      //     status: 400,
      //     message: "username already taken"
      //   })
      // }
    } 
    res.json({
      _id: enteredUser._id,
      username: enteredUser.username
    })
  })
});


module.exports = router;