var mongoose=require('mongoose');

var schema=mongoose.Schema;

var user=new schema({

    username:String,

    password:String,

    isAdmin:{

        type:Boolean,

        default:false

    }

});

module.exports=user;