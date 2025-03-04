const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    email:{
        type:String,
    },
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    token:{
        type:String,
        default:null,
    },
    watchlist:{
        type:Array,
        default: []
    }

},{timestamps:true})


const User = mongoose.model("User", UserSchema);
module.exports = User;