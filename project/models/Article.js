var S_article=require('../schemas/article');

var mongoose=require('mongoose');

module.exports=mongoose.model('article',S_article);
