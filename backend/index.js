const express = require("express");
const rootRouter=require("./routes/index")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

const PORT=3000;

app.use("/api/v1", rootRouter);


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})