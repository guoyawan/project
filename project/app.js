var express=require('express');//express模块引入

var app=express();

var ejs=require('ejs');

var bodyparser=require('body-parser');

var mongoose=require('mongoose');

var index=require('./routes/index');

var api=require('./routes/api');

var admin=require('./routes/admin');

var cookies=require('cookies');//cookies数据储存模块

var Userdata=require('./models/User');

app.set('html','view engine');//用于render页面渲染 设置文件类型 可视引擎

app.set('views','./tpl');//用于render页面渲染，设置 可视窗口，要渲染的ejs的路径

app.engine('html',ejs.renderFile);

app.use(function (req,res,next) {//设置cookies

    req.cookies =new cookies(req,res);//给cookies赋值；

    req.users={};//在请求里添加一个属性

    if (req.cookies.get('users')){//判断是否获取到种下的cookies
        try{
            req.users=JSON.parse(req.cookies.get('users'));

            Userdata.findById(req.users._id).then(function (x) {
                req.users.isAdmin=x.isAdmin;
            })
        }catch(e){
            console.log(E+'e');
        }
    }
  next();
});

app.use(bodyparser.urlencoded({extended:true}));

app.use('/public',express.static(__dirname+'/public'));

app.use('/',index)//8086/admin/login

app.use('/api',api)//8086/admin/login

app.use('/admin',admin)//8086/admin/login

mongoose.connect('mongodb://localhost:27018/project',function (err) {
    err?console.log(err):app.listen(8086);

});

