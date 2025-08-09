import Inquiry from "../models/inquiry.js";
import { isCustomer } from "./userController.js";

export async function addInquiry(req, res) {

    try {

        if(!isCustomer(req)) {
            return res.status(403).json({ message: "You are not authorized to submit an inquiry!" });
        }
        let id = 0;
        const data = req.body;

        if (!req.user || !req.user.email || !req.user.phone) {
            return res.status(400).json({ message: "User information is missing from request." });
        }

        data.email = req.user.email; // Set email from authenticated user
        data.phone = req.user.phone; // Set phone from authenticated user
        
        const lastInquiry = await Inquiry.findOne().sort({ id: -1 }).limit(1);

        // If there are no inquiries, start with ID 1
        if (!lastInquiry) {
            id = 1;
        } else {
            id = lastInquiry.id + 1;
        }

        data.id = id; // Assign the new ID

        const newInquiry = new Inquiry(data);
        const savedInquiry = await newInquiry.save();

        res.status(201).json({
            msg : "Inquiry submitted successfully!",
            inquiry: {
                id: savedInquiry.id
            }
        })
    } catch (error) {
        console.error("Inquiry submission error:", error); // Log the error for debugging
        res.status(500).json({
            message: "🚫 Inquiry submission failed!",
            error: error.message // Optionally send error message for debugging (remove in production)
        })
    }



}

//view inquiries
export async function viewInquiries(req,res){
    
}