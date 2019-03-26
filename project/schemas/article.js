var mongoose=require('mongoose');
var Schemas=mongoose.Schema;
var article=new Schemas({
    title:{//标题
        type:String,
        default:''
    },
    time:{//时间
        type: Date,
        default: new Date()
    },
    discuss:{//评论
        type:Array,
        default:[]
    },
    content:{//内容
        type:String,
        default:''
    },
    read:{//阅读量
        type:Number,
        default:0
    },
    sel_id:{//分类id
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    description:{//简介
        type:String,
        default:''
    },
    select:{//分类
        type:String,
        default:''
    }
 });

module.exports=article;