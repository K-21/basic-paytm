const express = require('express');
const zod = require("zod");
const router = express.Router();
const {UserModel} =require("../db")
const {JWT_SECRET}=require("../config")
const jwt= require("jsonwebtoken");
const { authMiddleware } = require('../middleware');
const {AccountModel}=require("../db")

const signupBody = zod.object({
    username: zod.string(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

const updatebody=zod.object({
    firstName: zod.string().optional(),
	lastName: zod.string().optional(),
	password: zod.string().optional()
})

router.post("/signup",async(req,res)=>{
    console.log(req.body);

    const success = signupBody.parse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"Incorrect inputs"
        })
    }

    const existinguser= await UserModel.findOne({
        username:req.body.username
    })

    if(existinguser){
         res.status(411).json({
             message: "Email already takens"
        })
    }

    const newUser = await UserModel.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })

    

   await AccountModel.create({
        userId:newUser._id,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId:newUser._id
    }, JWT_SECRET);

     res.status(200).json({
        msg:"User Created Successfully",
        token:token
    })
})

router.post("/signin",async(req,res)=>{

    const success = signupBody.parse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }

    const user = await UserModel.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token =jwt.sign({
            userId:user._id
        },JWT_SECRET)

        res.json({
            token: token
        })
        return;
    }

    return res.status(411).json({
        message: "Error while logging in"
    })

})

router.put("/",authMiddleware,async(req,res)=>{

    const success = updatebody.parse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }

    const user = await UserModel.findByIdAndUpdate({
        _id:req.userId
    },req.body)

    if(user){
        return res.status(200).json({
            msg:"User Updated Successfully"
        })
    }

    return res.status(411).json({
        message: "Error while updating user"
    })
})

router.get("/bulk",async(req,res)=>{
    const filter =req.query.filter||""

    

    const users = await UserModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
            users:users.map((user)=>({
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
            }))
        })
   

    
})



module.exports = router; 