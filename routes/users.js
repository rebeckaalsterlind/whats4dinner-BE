var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");
router.use(cors())

router.post("/registerUser", async function (req, res) {
  let newUser = req.body;
  const usernameTaken = await req.app.locals.db.collection("users").find({"userName": newUser.userName}).toArray()
  console.log('usernametaken', usernameTaken);
  if(usernameTaken.length > 0) {
    res.json({status: false, body: 'Username taken'})
  } else {
    console.log('before try');
    try {
      console.log('before hash');
      bcrypt.hash(newUser.password, 5)
    .then(hash => {
      // add hash to object?
      newUser.password = hash;
      // store hash in the database
      req.app.locals.db.collection("users").insertOne(newUser)
      .then(async registeredUser => {
        let getRegisteredUser = await req.app.locals.db.collection("users").find({"userName": newUser.userName}).toArray()
        getRegisteredUser[0].password = 'hidden';
        res.json({ status: true, body: getRegisteredUser[0] });
      })
    })
    .catch(err => {
      console.log('in catch', err);
      res.json({ status: false, body: err });
    })
  }
  catch (err) {
    console.log('didnt even go throur try');
    res.json({ status: false, body: err });
  }
  }

})

//log in user
router.post("/login", async function (req, res) {
console.log('in login', req.body);
  const user = await req.app.locals.db.collection("users").find({"userName": req.body.userName}).toArray()
  console.log('user', user);
  if (user.length <= 0) {
    return res.json({ status: false, body: 'No user found. Please register to login' });
  }
  try {
    console.log('in try');
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
