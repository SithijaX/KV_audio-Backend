import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(req,res){
    const {firstName, lastName, email, password, role, phone, address} = req.body;

    try{
        //check if user already exists
        let existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg: "user already exists!"});
        }

        //hashing pw
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const newUser = new User({
            firstName, lastName, email, role, password:hashedPassword, phone, address
        });
        
        const savedUser = await newUser.save();

        res.status(201).json({
            msg: "User Registration successfully!",
            user : {
                id : savedUser.id,
                name: `${savedUser.firstName} ${savedUser.lastName}`,
                email: savedUser.email,
                role: savedUser.role
            }
        })

    } catch(error){
        res.status(500).json({
            message: "🚫 Registration failed!",
            error: error.message
        })
    }
}


export async function getUsers(req,res){
    if(!req.user || req.user.role !== "admin"){
        res.status(401).json({
            msg: "you are not authorized to view user info!"
        })
    }

    try{
        const userList = await User.find();
        res.status(200).json(userList)
    }catch{
        res.status(500).json({msg:"userList fetching Failed!"});
    }
   /* User.find().then((result)=>{
        res.json(result);
    }).catch(()=>{
        res.status(500).json({
            msg : "error !"
        })
    }) */
}

export async function login(req, res) {
    const {email,phone, password, firstName, lastName} = req.body;

    try{
        //find user by email
        const user = await User.findOne({email});
        if(!user){
            return res.status(402).json({mag:"User not found!"});
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(403).json({message: "Invalid password! try again..."})
        }
        

        //create JWT token
        const token = jwt.sign({
            email: user.email,
            phone: user.phone,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }, process.env.jwtSecret, {expiresIn: '1h'});

        return res.status(202).json({
            msg : "User logining successfully! ",
            user:{
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                role: user.role
            }, token
        })
    }catch(err){
        res.status(500).json({
            message: "🚫 Login failed!",
            error: error.message
        })
    }
}

// Function to check if the user is an admin
export function isAdmin(req){
    if(req.user && req.user.role === "admin"){
        return true;
    }
    return false;
}

export function isCustomer(req){
    if(req.user && req.user.role === "customer"){
        return true;
    }else {
        return false;
    }
}