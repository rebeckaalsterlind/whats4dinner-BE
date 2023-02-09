var express = require('express');
var router = express.Router();
const cors = require("cors");
router.use(cors())
var path = require('path');
const ObjectId = require('mongodb').ObjectId;

router.post("/addCustomList", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
    { "_id": new ObjectId(`${req.body.id}`) },
    {$push: { "customLists": req.body.customList }});
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

router.post("/deleteCustomList", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
    { "_id": new ObjectId(`${req.body.id}`) },
    { $pull: { "customLists": { id: req.body.listId } } });
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
