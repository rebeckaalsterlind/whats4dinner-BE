var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const cors = require("cors");
router.use(cors())

router.post("/addMeal", async function (req, res) {

  try {
    const response = await req.app.locals.db.collection("users").updateOne(
      { "_id": ObjectId(`${req.body.id}`) },
      { $push: { "recipes": req.body.meal } });
    
    if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": ObjectId(`${req.body.id}`)}).toArray()
      user[0].password ='hidden';
      res.json(user[0])
    } 
    if(!response.acknowledged) {
      console.log('failed', response.acknowledged);
      res.send(response.acknowledged)
    }
  } 
  catch (err) {
    console.error(`Something went wrong: ${err}`);
    res.send(err)
  }

});

router.post("/addCategory", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
      { "_id": ObjectId(`${req.body.id}`) },
      { $push: { "categories": req.body.category } });
    
    if(response.acknowledged) {
      console.log('successfull', response.acknowledged);
      res.send(response.acknowledged)
    } 
    if(!response.acknowledged) {
      console.log('failed', response.acknowledged);
      res.send(response.acknowledged)
    }
  } 
  catch (err) {
    console.error(`Something went wrong: ${err}`);
    res.send(err)
  }

});


router.post("/addSuggestions", async function (req, res) {

  try {
    const response = await req.app.locals.db.collection("users").updateOne(
      { "_id": ObjectId(`${req.body.id}`) },
      {$set: { "list": req.body.list }}, {upsert: true});
    
      if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": ObjectId(`${req.body.id}`)}).toArray()
      console.log('successfull', user);
      user[0].password ='hidden';
      res.json(user[0])
    } 
    if(!response.acknowledged) {
      console.log('failed', response.acknowledged);
      res.send(response.acknowledged)
    }
  } 
  catch (err) {
    console.error(`Something went wrong: ${err}`);
    res.send(err)
  }

});
module.exports = router;
