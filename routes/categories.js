var express = require('express');
var router = express.Router();
const cors = require("cors");
router.use(cors())
var path = require('path');
const ObjectId = require('mongodb').ObjectId;

router.post("/addCategory", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
    { "_id": new ObjectId(`${req.body.id}`) },
    { $push: { "categories": req.body.category } });
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

router.post("/deleteCategory", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
    { "_id": new ObjectId(`${req.body.id}`) },
    { $pull: { "categories": { categoryId: req.body.categoryId } } });
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
