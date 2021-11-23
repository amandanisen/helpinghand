const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const checkFields = require("../validation/task");
const findUser = require('../utilities/findUser');


// Connect to mongo
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

router.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Create Task
router.post('/create', async(req, res) =>
{
    // input: name, description, date, max_slots, latitude, longitude, email
    // return: id, error
    var error = {};

    const {errors, isValid} = checkFields.checkTaskFields(req.body);
    if (!isValid)
    {
      error = errors;
      return res.status(400).json({id: -1, error});
    }
    const{name, description, date, max_slots} = req.body;
    const location = {type: "Point", coordinates: [req.body.longitude, req.body.latitude]};

    const newTask = {task_name: name, task_description: description, 
        task_date: date, max_slots: max_slots, task_location: location, slots_available: max_slots,
        vol_arr: []};
    
    const db = client.db();
    const result = await db.collection('tasks').insertOne(newTask);

    var ret = {id: result.insertedId, error: error};
    var coord = await db.collection('coordinator').updateOne({_id: await findUser({email: req.body.email, role: 'coordinator'})}, 
      {
        $push: 
        {
          task_arr: ret.id
        }
      }
      );
    res.status(200).json(ret);

});

router.get('/find', async(req, res) =>
{
  // input: latitude, longitude (of the volunteer searching), range
  // out: list of tasks
  const db = client.db();
  const {email} = req.params;

  await db.collection('volunteer').findOne({vol_email: email}).then( (user) => {
    if (user == null)
    {
      return res.status(400).json("Couldn't find user");
    }
    let searchRange = user.vol_accepted_distance * 1609.34;
    db.collection('tasks').find({task_location:
      {$near:
        {
          $geometry: {type: "Point", coordinates: user.vol_location.coordinates},
          $minDistance: 0,
          $maxDistance: searchRange
        }
      }
    }).toArray().then((results) =>{
      return res.status(200).json(results);
    });
    
  });

})

module.exports = router;