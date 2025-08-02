import Review from "../models/review.js";

export async function addReview(req,res){
    if (req.user == null){
        return res.status(401).json({message: "Please login and Retry!"});
    }


    const data = req.body;

    data.name = req.user.firstName+" "+req.user.lastName;
    data.email = req.user.email;
    data.profileImage = req.user.profileImage;

    const newReview = new Review(data);

    const savedReview = await newReview.save();

    if(savedReview){
        return res.status(200).json({message: "Review added successfully!"});
    } else {
        return res.status(500).json({message: "Failed to add review!"});
    }
}