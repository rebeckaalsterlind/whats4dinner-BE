var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectId;
const cors = require("cors");
router.use(cors())

router.post("/registerUser", async function (req, res) {
  let newUser = req.body;
  const usernameTaken = await req.app.locals.db.collection("users").find({"userName": newUser.userName}).toArray()
  if(usernameTaken.length > 0) {
    res.json({status: false, body: 'Username taken'})
  } else {
    try {
      bcrypt.hash(newUser.password, 5)
    .then(hash => {
      newUser.password = hash;
      req.app.locals.db.collection("users").insertOne(newUser)
    .then(async registeredUser => {
      let getRegisteredUser = await req.app.locals.db.collection("users").find({"userName": newUser.userName}).toArray()
      getRegisteredUser[0].password = 'hidden';
      res.json({ status: true, body: getRegisteredUser[0] });
    })
    })
    .catch(err => {
      res.json({ status: false, body: err });
    })
  }
  catch (err) {
    res.json({ status: false, body: err });
  }
}
})

//log in user
router.post("/login", async function (req, res) {
  const user = await req.app.locals.db.collection("users").find({"userName": req.body.userName}).toArray()
  if (user.length <= 0) {
    return res.json({ status: false, body: 'No user found. Please register to login' });
  }
  try {
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (!result) {
        return res.json({ status: false, body: 'Username or password incorrect' });
      }
      if (result) {
        user[0].password ='hidden';
        res.json({ status: true, body: user[0] });
      }
    })
  }
  catch (err) {
    res.json({ status: false, body: 'Something went wrong. Please try again' });
  }
});
 
module.exports = router;
