const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookingDB', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const auth = require('./routes/auth')
app.use('/auth', auth)

const client = require('./routes/client')
app.use('/client', client)

const admin = require('./routes/admin')
app.use('/admin', admin)
/*simple example of dijkstra*/
const Graph = require('node-dijkstra')
const route = new Graph();
    
   
    route.addNode('A', { B: 1 })
    route.addNode('B', { A: 1, C: 2, D: 4 })
    route.addNode('C', { B: 2, D: 1 })
    route.addNode('D', { C: 1, B: 4 })
    
    console.log(route.path('A', 'D', { cost: true }));

app.listen(3001, () => {
  console.log('server is running on port 3000');
})
