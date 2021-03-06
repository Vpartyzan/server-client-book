const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

//mongoose.connect('mongodb://localhost:27017/festivalDB', { useNewUrlParser: true, useUnifiedTopology: true });
const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.mugct.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority/${process.env.DB_NAME}` : 'mongodb://localhost:27017/festivalDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket');
});

module.exports = server;