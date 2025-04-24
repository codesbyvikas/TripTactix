const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps:true}
);

const USER = model('user',userSchema);

module.exports =  USER;