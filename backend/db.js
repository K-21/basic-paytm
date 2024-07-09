const mongoose=require("mongoose")
// connect to mongoose url by compas or with their official website

 const User=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,// ref to user model
        ref:"users",
        required:true
},
    balance:{
        type:Number,
        required:true
    }

})

 const UserModel=mongoose.model("users",User)
 const AccountModel=mongoose.model("accounts",accountSchema)

 module.exports={
    UserModel,
    AccountModel
 }
