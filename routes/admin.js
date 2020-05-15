const router = require('express').Router();
const flight = require('../models/flight');
const user = require('../models/user');
const airport = require('../models/airport');
const booking = require('../models/booking');

router.get('/user/:id', async (req, res) => {
    if (req.params.id === 'all') {
        const userResult = await user.find().exec();
        res.send({ msg: 'OK', data: userResult });
    } else {
        const userResult = await user.findOne({ _id: req.params.id }).exec();
        res.send({ msg: 'OK', data: userResult });
    }
});
router.post('/user/update/:id', async (req, res) => {
    const userResult = await user.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
    res.send({ msg: 'OK', data: userResult });
});
router.post('/user/add', async (req, res) => {
    const userResult = await user.create(req.body).catch(err => err);
    res.send({ msg: userResult.id ? 'OK' : 'NOT OK', data: userResult })
})
router.get('/user/delete/:id', async (req, res) => {
    const userResult = await user.deleteOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: userResult });
});
router.get('/airport/:id', async (req, res) => {
    if (req.params.id === 'all') {
        const airportResult = await airport.find().exec();
        res.send({ msg: 'OK', data: airportResult });
    } else {
        const airportResult = await airport.findOne({ _id: req.params.id }).exec();
        res.send({ msg: 'OK', data: airportResult });
    }
});
router.post('/airport/update/:id', async (req, res) => {
    const airportResult = await airport.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
    res.send({ msg: 'OK', data: airportResult });
});
router.post('/airport/add', async (req, res) => {
    const airportResult = await airport.create(req.body).catch(err => err);
    res.send({ msg: airportResult.id ? 'OK' : 'NOT OK', data: airportResult })
})
router.get('/airport/delete/:id', async (req, res) => {
    const airportResult = await airport.deleteOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: airportResult });
});

router.get('/flight/:id', async (req, res) => {
    if (req.params.id === 'all') {
        const flightResult = await flight.find().populate('arr').populate('dep').exec();
        res.send({ msg: 'OK', data: flightResult });
    } else {
        const flightResult = await flight.findOne({ _id: req.params.id }).populate('arr').populate('dep').exec();
        res.send({ msg: 'OK', data: flightResult });
    }
})
router.post('/flight/add', async (req, res) => {
    const flightResult = await flight.create(req.body).catch(err => err);
    res.send({ msg: flightResult.id ? 'OK' : 'NOT OK', data: flightResult })
})
router.post('/flight/update/:id', async (req, res) => {
    const flightResult = await flight.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
    res.send({ msg: 'OK', data: flightResult });
});
router.get('/flight/delete/:id', async (req, res) => {
    const flightResult = await flight.deleteOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: flightResult });
});

router.get('/booking/:id', async (req, res) => {
    if (req.params.id === 'all') {
        const bookingResult = await booking.find()
        .populate({ path: 'flight',populate:{path:'arr'} })
        .populate({ path: 'flight',populate:{path:'dep'} })
        .populate('client').exec();
        res.send({ msg: 'OK', data: bookingResult });
    } else {
        const bookingResult = await booking.findOne({ _id: req.params.id }).exec();
        res.send({ msg: 'OK', data: bookingResult });
    }
})
router.post('/booking/update', async (req, res) => {
    const bookingResult = await booking.updateOne({ _id: req.body.id }, { $set: {status: req.body.status} }).exec();
    res.send({ msg: 'OK', data: bookingResult });
});
router.post('/booking/delete/:id', async (req, res) => {
    const bookingResult = await booking.deleteOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: bookingResult });
});

module.exports = router;
