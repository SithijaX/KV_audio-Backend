import express from "express"
import mongoose from "mongoose"
import deviceRouter from "./Routes/deviceRoutes.js";
import userRouter from "./Routes/userRouter.js";
import jwt from 'jsonwebtoken';

let app = express();
app.use(express.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization")

    if(token!=null){
        token = token.replace("Bearer ", "");
        console.log(token);

        jwt.verify(token, "KV_Secret", (err, decoded)=>{
            if(err){
                console.log(decoded);
                return res.status(401).json({message: "Unauthorized access!"});
            }   
          
            req.user = decoded;
        })
    }
    next();
});

mongoose.connect("mongodb+srv://admin:12345@c1.6fthtvf.mongodb.net/?retryWrites=true&w=majority&appName=C1");

let connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongodb connection Established successfully!");
})


app.use("/api/device", deviceRouter);
app.use("/api/user", userRouter);

app.listen(5000, ()=>{
    console.log("Server is running on port 5000!");
})