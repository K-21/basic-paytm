const express=require("express")
const {AccountModel}=require("../db")
const {authMiddleware}=require("../middleware")
const mongoose=require("mongoose")

const router=express.Router()

router.get("/balance",authMiddleware,async(req,res)=>{

    const account=await AccountModel.findOne({
        userId:req.userId
    })
    
    res.json({
        balance: account.balance
    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    try{
    const { amount, to } = req.body;
    console.log(req.userId);

    // Fetch the accounts within the transaction
    const account = await AccountModel.findOne({ userId: req.userId }).session(session);

    console.log(account);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await AccountModel.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await AccountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}catch(error){
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
        message: "An error occurred during the transfer",
        error: error.message
    });
}

}); 

module.exports=router;
