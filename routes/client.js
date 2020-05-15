const router = require('express').Router();
const flight = require('../models/flight');
const booking = require('../models/booking');
const Graph = require('node-dijkstra')

router.get('/flights/recent', async (req, res) => {
    const flightResult = await flight.find().populate('arr').populate('dep').exec();
    res.send({ msg: 'OK', data: flightResult });
})
router.get('/flight/:id', async (req, res) => {
    const flightResult = await flight.findOne({ _id: req.params.id }).populate('arr').populate('dep').exec();
    res.send({ msg: 'OK', data: flightResult });
})
router.post('/booking/add', async (req, res) => {
    const bookingResult = await booking.create(req.body).catch(err => err);
    res.send({ msg: bookingResult.id ? 'OK' : 'NOT OK', data: bookingResult })
})
router.get('/booking/:id', async (req, res) => {
    const bookingResult = await booking.find({ client: req.params.id })
        .populate({ path: 'flight', populate: { path: 'arr' } })
        .populate({ path: 'flight', populate: { path: 'dep' } })
        .exec();
    res.send({ msg: 'OK', data: bookingResult });
})
router.post('/search', async (req, res) => {

    console.log(req.body);

    const flightResult = await flight.find({ dep: req.body.dep, arr: req.body.arr, date: req.body.checkin }).populate('arr').populate('dep').exec();

    const route = new Graph();
    
   
    
   

    flightResult.forEach(f => {
        route.addNode(f.dep._id, { [f.arr._id]: f.price })
    });
    console.log(route);
    const graphResult = route.path(req.body.dep, req.body.arr);
    const filtredFlights = await flight.find({ dep: { $in: graphResult }, arr: { $in: graphResult } }).populate('arr').populate('dep').exec();
    res.send({ msg: 'OK', data: flightResult });
})


module.exports = router;