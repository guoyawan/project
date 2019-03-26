var S_category=require('../schemas/category');

var mongoose=require('mongoose');

module.exports=mongoose.model('category',S_category);