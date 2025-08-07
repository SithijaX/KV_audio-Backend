import Review from "../models/review.js";

export async function addReview(req,res){
    if (req.user == null){
        return res.status(401).json({message: "Please login and Retry!"});
    }


    const data = req.body;

    data.name = req.user.firstName+" "+req.user.lastName;
    data.email = req.user.email;
    data.profileImage = req.user.profileImage;

    // Set isApproved to false before saving
    data.isApproved = false;

    const newReview = new Review(data);
    const savedReview = await newReview.save();

    if(savedReview){
        return res.status(200).json({message: "Review added successfully!"});
    } else {
        return res.status(500).json({message: "Failed to add review!"});
    }
}


export async function getReviews(req,res){
    try{
    let reviews;

    if(!req.user || req.user.role !== "admin"){
        reviews = await Review.find({isApproved: true}).sort({date: -1});
    } else {
        reviews = await Review.find().sort({date: -1});
    }

    return res.status(200).json(reviews);
    }
    catch(err){
        return res.status(500).json({message: "Error fetching reviews!"});
    }
}


export async function deleteReview(req, res) {
    const { email } = req.params;

    if (!req.user){
        return res.status(401).json({ message: "Please login and Retry!" });
        return;
    }

    if (req.user.role === "admin") {
        try {
        const deletedReview = await Review.findOneAndDelete({ email });
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found!" });
        }
        return res.status(200).json({ message: "Review deleted successfully!" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting review!" });
    }
    } else{
        if(email === req.user.email){
            try {
                const deletedReview = await Review.findOneAndDelete({ email });
                if (!deletedReview) {
                    return res.status(404).json({ message: "Review not found!" });
                }
                return res.status(200).json({ message: "Review deleted successfully!" });
            } catch (err) {
                return res.status(500).json({ message: "Error deleting review!" });
            }
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this review!" });
        }
    }
}

export async function approveReview(req, res) {
    const { email } = req.params;
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to approve reviews!" });
    }

    try {
        const updatedReview = await Review.findOneAndUpdate(
            { email },
            { isApproved: true },
            { new: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found!" });
        }
        return res.status(200).json({ message: "Review approved successfully!" });
    } catch (err) {
        return res.status(500).json({ message: "Error approving review!" });
    }
}