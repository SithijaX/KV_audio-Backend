import express from "express"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
//import route files
import reviewRouter from "./Routes/reviewRouter.js";
import itemRouter from "./Routes/itemRouter.js";
import userRouter from "./Routes/userRouter.js";


dotenv.config();


let app = express();
app.use(express.json());

// Middleware to verify JWT token
app.use((req,res,next)=>{
    let token = req.header("Authorization");

    if(token!=null){
        token = token.replace("Bearer ", "");
        console.log(token);

        jwt.verify(token, process.env.jwtSecret, (err, decoded)=>{
            if(err){
                console.log(decoded);
                return res.status(401).json({message: "Unauthorized access!"});
            }   
          
            req.user = decoded;
            console.log( req.user);
            next();
        })
    } else{
    next();
}
});

// Connect to MongoDB
mongoose.connect(process.env.mongoUrl);

let connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongodb connection Established successfully!");
})

// Define routes
app.get("/", (req, res) => {
    res.send("Welcome to KV Audio API!");
});
app.use("/api/review", reviewRouter);
app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);


// Start the server
app.listen(5000, ()=>{
    console.log("Server is running on port 5000!");
})


//Sample users 
//customer :
/*  "email": "sudu@yahoo.com",
    "password": "12345" */

//admin:
/*  "email": "Purple2@tempmail.com",
    "password": "12345" */