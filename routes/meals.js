var express = require('express');
var router = express.Router();
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;
router.use(cors())


// meal
router.post("/addMeal", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
      { "_id": new ObjectId(`${req.body.id}`) },
      { $push: { "meals": req.body.meal } });
    
    if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": new ObjectId(`${req.body.id}`)}).toArray()
      user[0].password ='hidden';
      console.log('user', user[0]);
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

router.post("/deleteMeal", async function (req, res) {
    try {
      const response = await req.app.locals.db.collection("users").updateOne(
          { "_id": new ObjectId(`${req.body.id}`) },
          { $pull: { "meals": { id: req.body.meal.id } } }
      );

      if(response.acknowledged) {
        const user = await req.app.locals.db.collection("users").find({"_id": new ObjectId(`${req.body.id}`)}).toArray()
        user[0].password ='hidden';
        console.log('user', user[0]);
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
      { "_id": new ObjectId(`${req.body.id}`) },
      { $push: { "categories": req.body.category } });
    
    if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": new ObjectId(`${req.body.id}`)}).toArray()
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

router.post("/deleteCategory", async function (req, res) {
  console.log('deleteCategory', req.body);
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
        { "_id": new ObjectId(`${req.body.id}`) },
        { $pull: { "categories": { categoryId: req.body.categoryId } } }
    );

    if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": new ObjectId(`${req.body.id}`)}).toArray()
      user[0].password ='hidden';
      console.log('user', user[0]);
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

router.post("/addCustomList", async function (req, res) {
  try {
    const response = await req.app.locals.db.collection("users").updateOne(
      { "_id": new ObjectId(`${req.body.id}`) },
      {$push: { "customLists": req.body.customList }});
    
      if(response.acknowledged) {
      const user = await req.app.locals.db.collection("users").find({"_id": new ObjectId(`${req.body.id}`)}).toArray()
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
