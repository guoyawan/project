var S_user=require('../schemas/user');

var mongoose=require('mongoose');

module.exports=mongoose.model('user',S_user);