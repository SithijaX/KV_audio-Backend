import Inquiry from "../models/inquiry.js";
import { isAdmin, isCustomer, isLoged } from "./userController.js";

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
    if(!req.user){
        return res.status(401).json({
            "message": "Please login and try again !"
        })
    }

    if(isCustomer(req)){
        try {
            const inquiries = await Inquiry.find({ email: req.user.email });
            res.status(200).json({
                message: "Inquiries retrieved successfully!",
                inquiries
            });
        } catch (error) {
            console.error("Error retrieving inquiries:", error);
            res.status(500).json({
                message: "🚫 Failed to retrieve inquiries!",
                error: error.message
            }); 
        }
    }

    if(isAdmin(req)){
        try {
            const inquiries = await Inquiry.find();
            res.status(200).json({
                message: "Inquiries retrieved successfully!",
                inquiries
            });
        } catch (error) {
            console.error("Error retrieving inquiries:", error);
            res.status(500).json({
                message: "🚫 Failed to retrieve inquiries!",
                error: error.message
            }); 
        }
    }
}


//delete inquiry
export async function deleteInquiry(req, res) {
    if (!isLoged(req)) {
        return res.status(403).json({ message: "You are not authorized to delete inquiries!" });
    }

    const inquiryId = req.params.id;

    //For Customer Services

    try {
        // Find inquiry by custom id field
        const inquiry = await Inquiry.findOne({ id: inquiryId });

        if (!inquiry) {
            return res.status(404).json({ message: "❌ Inquiry not found!" });
        }

        // Only allow customers to delete their own inquiries
        if (isCustomer(req) && inquiry.email !== req.user.email) {
            return res.status(403).json({ message: "🚫 You can only delete your own inquiries!" });
        }

        await Inquiry.deleteOne({ id: inquiryId });

        return res.status(200).json({
            message: "✅ Inquiry deleted successfully!"
        });
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        return res.status(500).json({
            message: "🚫 Failed to delete inquiry!",
            error: error.message
        });
    }


    //For Admin
    if (isAdmin(req)) {
        try {
            const inquiry = await Inquiry.findOne({ id: inquiryId });
            if (!inquiry) {
                return res.status(404).json({ message: "❌ Inquiry not found!" });
            }
            await Inquiry.deleteOne({ id: inquiryId });
            return res.status(200).json({
                message: "✅ Inquiry deleted successfully!"
            });
        } catch (error) {
            console.error("Error deleting inquiry:", error);
            return res.status(500).json({
                message: "🚫 Failed to delete inquiry!",
                error: error.message
            });
        }
    }
}



/*try {
        const inquiryId = req.params.id;
        const deletedInquiry = await Inquiry.findByIdAndDelete(inquiryId);

        if (!deletedInquiry) {
            return res.status(404).json({ message: "Inquiry not found!" });
        }

        res.status(200).json({ message: "Inquiry deleted successfully!" });
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        res.status(500).json({
            message: "🚫 Failed to delete inquiry!",
            error: error.message
        });
    }*/