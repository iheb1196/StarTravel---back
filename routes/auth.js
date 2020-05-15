const routes = require('express').Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');

routes.post('/login', async (req, res) => {
    const userResult = await user.findOne({ email: req.body.email }).exec();
    if (!userResult) { res.send({ msg: 'User not found', data: '' }); }
    if (!userResult.comparePassword(req.body.password, userResult.password)) { res.send({ msg: 'Bad password', data: '' }); }
    userResult.password = '';
    res.send({ msg: 'OK', data: { token: jwt.sign({ data: userResult }, 'SuperSecret!!!'), role: userResult.role } });
})

routes.post('/register', async (req, res) => {
    console.log(req.body);
    req.body.role = 'client';
    const userResult = await user.create(req.body).catch(err => err);
    res.send({ msg: userResult.id ? 'OK' : 'NOT OK', data: userResult })
})

module.exports = routes;