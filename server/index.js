const keys = require('./keys');

// Express App Setup
const express = require('express');

const app = express();

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

// CORS
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/increment', (req, res) => {
    redisClient.incr("value", (err, val) => {
      res.send({"value": val})
    })
  })

app.listen(5000, (err) => {
  console.log('Listening');
});