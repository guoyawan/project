var express = require('express');

var route = express.Router();

var Userdata=require('../models/User');

route.get('/user',function (req,res) {
    res.render('main/load.ejs',{});
});

route.use(function (req, res, next) {

    json = {
        code: 0,
        smg: 'success!'
    };
    next();
});
//注册
route.get('/user/sig',function (req,res) {
    var username=req.query.username;
    var password=req.query.password;
    Userdata.findOne({
        username:username
    }).then(function (info) {
        if (info) {
            json.code=1;
            json.msg='用户名已存在';
            res.send(json);
            return;
        }else {
            var user = new Userdata({
                username:username,
                password:password
            });
            return user.save();
        }
    }).then(function (newinfo) {
        if (newinfo){
            json.code=2;
            json.msg='注册成功';
            res.send(json);
            res.end();
        }
    })
});
//登录
route.get('/user/log',function (req,res) {
    var username=req.query.username;
    var password=req.query.password;
 Userdata.findOne({
     username:username,
     password:password
 }).then(function (info) {
     if(info){
         json.code=3;
         json.msg='登陆成功';
         req.cookies.set('users',JSON.stringify({//种cook，users是设置的cookies的名字
             _id:info._id,//给cookies赋值
             username:info.username,//给cookies赋值
             isAdmin:info.isAdmin
         }));
         res.send(json);
         return;
     }else{
         json.code=4;
         json.msg='用户名或密码错误';
         res.send(json);
         res.end();
     }
 })
});

route.get('/user/logout',function (req,res) {
    req.cookies.set('users',null);
    json.code=5;
    json.msg='清除cookies成功';
    res.send(json);
    res.end();
});
module.exports = route;