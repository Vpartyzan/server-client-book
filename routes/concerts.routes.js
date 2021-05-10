const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find( v => v.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };

  db.concerts.push(newConcert);

  return res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
  let element = db.concerts.find( v => v.id == req.params.id);
  
  if (element) {
    db.concerts.splice(db.concerts.indexOf(element), 1);

    return res.json({message: 'OK'});
  } else {
    res.json({ message: 'Not found...' });
  }  
  
});

router.route('/concerts/:id').put((req, res) => {
  for (let obj of db.concerts) {
    if (obj.id == req.params.id) {
      obj.performer = req.body.performer,
      obj.genre = req.body.genre;
      obj.price = req.body.price;
      obj.day = req.body.day;
      obj.image = req.body.image;
      
      return res.json({message: 'OK'});
    } else {
      res.json({ message: 'Not found...' });
    }
  }
});

module.exports = router;