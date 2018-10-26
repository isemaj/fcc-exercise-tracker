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

router.post("/add", (req, res, next) => {
  Users.findById(req.body.userId, (err, result) => {
    // console.log(result); // { _id: 'bTWEWCP1h', username: 'BIlly Martin', __v: 0 }
    if(err) { return next(err) }
    if(!result) { 
      return next({
        message: "user id not found"
      }) 
    }


    const exercise = new Exercise(req.body); 
    exercise.username = result.username;  // this one will be part of `this` in pre save; this one before the `pre-save` hoook

    exercise.save((err, enteredExercise) => {
      // what happened in pre-save can see here, ie `this.date`
      console.log(enteredExercise)
      if(err) { return next(err) };
      enteredExercise = enteredExercise.toObject();
      delete enteredExercise.__v;
      enteredExercise._id = enteredExercise.userId;
      delete enteredExercise.userId;
      enteredExercise.date = new Date(enteredExercise.date).toDateString()
      res.json(enteredExercise);
    })

  })
});

router.get("/users", (req, res, next) => {
  Users.find({}, (err, users) => {
    res.json(users)
  })
})

router.get("/log", (req, res, next) => {
  Users.findById(req.query.userId, (err, result) => {
    if(err) { return next(err) };
    if(!result) {
      return next({
        message: "user id not found"
      })
    }

    // Exercise.find({
    //   userId: req.query.userId
    // })
    // .exec((err, ))

    Exercise.find({userId: req.query.userId}, (err, exercise) => {
      res.json(exercise)
    })

  })
})

// test route // remove it later
router.get("/exercises", (req, res, next) => {
  // Exercise.find({}, (err, exercise) => {
  //   res.json(exercise)
  // });
  Exercise.find({})
    .exec((err, exercise) => {
      res.json(exercise);
    })
})

module.exports = router;