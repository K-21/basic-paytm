const jwt =require("jsonwebtoken")
const {JWT_SECRET}=require("./config")
const express=require("express")

const app=express()
app.use(express.json())

const authMiddleware=(req,res,next)=>{

    const token = req.headers.authorization
    console.log(token);

    if(!token||!token.startsWith("Bearer")){
        return res.status(403).json({
            msg:"No token found"
        })
    }

    const words = token.split(" ")[1]
    try{
        const verify=jwt.verify(words,JWT_SECRET)

        req.userId=verify.userId

        next();
    }catch(err){
            
        return res.status(403).json({
            msg:"Invalid token"
        })
    }
}

module.exports={
    authMiddleware
}