const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));


const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  let random = Math.floor(Math.random() * db.length);
  res.json(db[random]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find( v => v.id == req.params.id ));
});

app.post('/testimonials', (req, res) => {
  const newAuthor = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };

  db.push(newAuthor);
  
  return res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  for (let obj of db) {
    if (obj.id == req.params.id) {
      obj.author = req.body.author,
      obj.text = req.body.text;
      return res.json({message: 'OK'});
    } else {
      res.json({ message: 'Not found...' });
    }
  }
});

app.delete('/testimonials/:id', (req, res) => {
  for (let obj of db) {
    if (obj.id == req.params.id) {
      db.splice(db.indexOf(obj), 1);

      return res.json({message: 'OK'});
    } else {
      res.json({ message: 'Not found...' });
    }   
  }  
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});