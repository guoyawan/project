var express = require('express');

var route = express.Router();

var Userdata=require('../models/User');

var Category=require('../models/Category');

var Article=require('../models/Article');

var json={};
// 用户数据页面渲染
route.get('/',function (req,res) {
    var page = Number(req.query.page) || 1;
    var skip = (page - 1) * 15;
    Userdata.count().then(function (count) {
        Userdata.find().limit(15).skip(skip).then(function (info) {
            var pages = Math.ceil(count / 15);
            res.render('admin/user.ejs',{
                user:info,
                count: count,
                limit: 15,
                pages: pages,
                page: page,
                num:0
        });
      });
    });
});
// 分类增加页面渲染
route.get('/add_category',function (req,res) {
    res.render('admin/add_category.ejs',{num:2});
});
// 分类增加
route.get('/add_category/add',function (req,res) {
    var name=req.query.name;
    Category.findOne({
        name:name
    }).then(function (info) {
        if (info){
            json.code=1;
            json.smg='分类名已存在';
            res.send(json);
            return;
        };
        var category= new Category({
            name: name
        });
        return category.save();

    }).then(function (newinfo) {
        if (newinfo){
            json.code=2;
            json.smg='添加分类成功';
            res.send(json);
            res.end();
        }
    });
});
//分类管理页面渲染
route.get('/manage_category',function (req,res) {
    Category.find().then(function (info) {
        res.render('admin/manage_category.ejs',{data:info,num:1});
    })
});
//分类修改
route.get('/manage_category/modify',function (req,res) {
    var id=req.query.id;
    var name=req.query.name;
    Category.findOne({
        _id:{$ne:id},
        name: name
    }).then(function (info) {
        if (info){
            json.code = 3;
            json.msg = '该类名存在';
            res.send(json);
            return;
        } else{
            return Category.update({_id:id},{name:name})
        }
    }).then(function (newinfo) {
        if (newinfo){
            json.code = 4;
            json.msg = '修改成功';
            res.send(json);
        }
    })
});
//分类删除
route.get('/manage_category/delete', function (req, res) {
    var id = req.query.id;
    Category.remove({_id: id}).then(function (info) {
        Article.remove({sel_id:id}).then(function (info1) {
            if (info) {
                json.code = 5;
                json.msg = '删除成功';
                res.send(json);
                return;
            }
        });
    })
});
//文章添加页面渲染
route.get('/add_article',function (req,res) {
    Category.find().then(function (info) {
        res.render('admin/add_article.ejs',{cate:info,num:3});
    })
});
//文章添加
route.post('/add_article/add',function (req,res) {
   new Article({
       title:req.body.title,
       description:req.body.description,
       content:req.body.content,
       select:req.body.select,
       sel_id:req.body.sel_id
   }).save().then(function (info) {
       if (info){
           json.code=6;
           json.msg='上传文件成功';
           res.send(json);
           res.end();
       }
   })
});
//文章管理页面渲染
route.get('/manage_article',function (req,res) {
    var page = Number(req.query.page) || 1;
    var skip = (page - 1) * 10;
    Article.count().then(function (count) {
    Article.find().limit(10).skip(skip).then(function (info) {
        var pages = Math.ceil(count / 10);
        res.render('admin/manage_article.ejs',{
            article:info,
            count: count,
            limit: 10,
            pages: pages,
            page: page,
            num:4
          })
        })
    });
});
//文章删除
route.get('/manage_article/delete', function (req, res) {
    var id = req.query.id;
    Article.remove({_id: id}).then(function (info) {
        if (info) {
            json.code = 7;
            json.msg = '删除成功';
            res.send(json);
            return;
        }
    })
});
//文章修改页面渲染
route.get('/manage_article/modify', function (req, res) {
    var id=req.query.id;
    var sel_id=req.query.sel_id;
    Article.find({_id:id}).then(function (info) {
        Category.find({_id:{$ne:sel_id}}).then(function (info1) {
                res.render('admin/modify_article.ejs',{article:info,cate:info1});
        })
    });
});
//文章修改
route.post('/manage_article/modify/work',function (req,res) {
    console.log(req);
    Article.update({_id:req.body.id},{title:req.body.title,description: req.body.description,
        content: req.body.content,select:req.body.select,sel_id:req.body.sel_id}).then(function (info) {
            json.code=8;
            json.msg='修改成功';
            res.send(json);
            res.end();
    })
});

module.exports = route;