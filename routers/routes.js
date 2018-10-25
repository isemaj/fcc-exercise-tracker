const Users = require("../models/users");
const Exercise = require("../models/exercises");

const router = require("express").Router();

router.post("/new-user", (req, res, next) => {
  const user = new Users(req.body);
  user.save((err, enteredUser) => {
    if(err) {
      return next({
        message: err.message
      })
      
    } 
    res.json({
      _id: enteredUser._id,
      username: enteredUser.username
    })
  })
});


module.exports = router;