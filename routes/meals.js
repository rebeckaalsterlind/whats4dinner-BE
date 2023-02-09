var express = require('express');
var router = express.Router();
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;
router.use(cors())

router.post("/addMeal", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
    { "_id": new ObjectId(`${req.body.id}`) },
    { $push: { "meals": req.body.meal } });
    if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": new ObjectId(`${req.body.id}`)}).toArray()
      user[0].password ='hidden';
      res.json(user[0])
    } 
    if(!response.acknowledged) {
      res.send(response.acknowledged)
    }
  } 
  catch (err) {
    res.send(err)
  }
});

router.post("/deleteMeal", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
    { "_id": new ObjectId(`${req.body.id}`) },
    { $pull: { "meals": { id: req.body.meal.id } } });
    if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": new ObjectId(`${req.body.id}`)}).toArray()
      user[0].password ='hidden';
      res.json(user[0])
    } 
    if(!response.acknowledged) {
      res.send(response.acknowledged)
    }
  } 
  catch (err) {
    res.send(err)
  }
});

module.exports = router;
