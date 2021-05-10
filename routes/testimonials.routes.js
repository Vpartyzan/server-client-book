const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  let random = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[random]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find( v => v.id == req.params.id ));
});

router.route('/testimonials').post((req, res) => {
  const newAuthor = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };

  db.testimonials.push(newAuthor);
  
  return res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  for (let obj of db.testimonials) {

    if (obj.id == req.params.id) {
      obj.author = req.body.author,
      obj.text = req.body.text;
      return res.json({message: 'OK'});
    } else {
      res.json({ message: 'Not found...' });
    }

  };
});

router.route('/testimonials/:id').delete((req, res) => {
  let element = db.concerts.find( v => v.id == req.params.id);

  if (element) {
    db.testimonials.splice(db.testimonials.indexOf(element), 1);

    return res.json({message: 'OK'});
  } else {
    res.json({ message: 'Not found...' });
  }  

});

module.exports = router;