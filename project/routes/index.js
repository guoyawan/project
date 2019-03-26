var express = require('express');

var route = express.Router();

var Userdata=require('../models/User');

route.get('/', function (req, res) {
    // console.log(req.users);
    res.render('main/index.ejs', {usersinfo:req.users});
});

route.get('/clover',function (req,res) {
    res.render('main/Clover.ejs',{});
});

route.get('/reading',function (req,res) {
    res.render('main/reading.ejs',{});
});

module.exports = route;