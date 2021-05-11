const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});