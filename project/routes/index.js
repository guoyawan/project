var express = require('express');

var route = express.Router();

var Article=require('../models/Article');

var Category=require('../models/Category');

var jsons={};
//主页面渲染
route.get('/', function (req, res) {
    var page = Number(req.query.page) || 1;
    var skip = (page - 1) * 10;
    Category.find().then(function (Cate) {
        Article.count().then(function (count) {
            Article.find({sel_id:req.query.id}).then(function (Article1) {
                Article.find().sort({_id:-1}).limit(10).skip(skip).then(function (article) {
                    var pages = Math.ceil(count / 10);
                    res.render('main/index.ejs', {
                        usersinfo:req.users,
                        article:article,
                        pages:pages,
                        page:page,
                        Cate:Cate,
                        Article1:Article1
                    });
                })
            })
        })
    });

});
// 主题介绍页面渲染
route.get('/clover',function (req,res) {
     Category.find().then(function (Cate) {
    res.render('main/Clover.ejs',{Cate:Cate});
  })
});
// 文章阅读页面渲染
route.get('/reading',function (req,res) {
    // console.log(req.users);
    Article.findOne({_id:req.query.id}).then(function (article) {
        article.read++;
        article.save();
        Category.find().then(function (Cate) {
        res.render('main/reading.ejs',{usersinfo:req.users,article:article,Cate:Cate});
      })
    })
});
// 文章留言
route.post('/reading/massage',function (req,res){
    Article.findOne({
        _id:req.body.id
    }).then(function (info) {
        info.discuss.push({
            username:req.body.username,
            content:req.body.discuss,
            time:new Date().toLocaleString(),
            id:new Date().getTime()
        });
        return info.save();
    }).then(function (info2) {
        if(info2){
            jsons.code=1;
            jsons.msg='发表成功';
            res.send(jsons);
            return;
        }
    })
});
//留言删除
route.get('/reading/msg/del', function (req, res) {
    var msg_id= req.query.msg_id;
    var art_id= req.query.art_id;
    Article.find({_id:art_id}).then(function (info) {
       for(var i=0;i<info[0].discuss.length;i++) {
           if (Number(info[0].discuss[i].id) === Number(msg_id)) {
               info[0].discuss.splice(i, 1);
           }
       }
       return Article.update({_id:art_id},{discuss:info[0].discuss})
    }).then(function (info2) {
        if(info2){
            jsons.code=2;
            jsons.msg='删除成功';
            res.send(jsons);
            return;
        }
    })

});
module.exports = route;