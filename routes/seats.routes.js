const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find( v => v.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const newSeats = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };

  db.seats.push(newSeats);

  return res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  let element = db.seats.find( v => v.id == req.params.id);
  
  if (element) {
    db.seats.splice(db.seats.indexOf(element), 1);

    return res.json({message: 'OK'});
  } else {
    res.json({ message: 'Not found...' });
  }  
  
});

router.route('/seats/:id').put((req, res) => {
  for (let obj of db.seats) {
    console.log(obj);
    if (obj.id == req.params.id) {
      obj.day = req.body.day,
      obj.seat = req.body.seat;
      obj.client = req.body.client;
      obj.email = req.body.email;
      
      return res.json({message: 'OK'});
    } else {
      res.json({ message: 'Not found...' });
    }
  }
});

module.exports = router;