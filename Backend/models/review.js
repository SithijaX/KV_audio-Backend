import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
        required: true
    },
    isApproved: { 
        type: Boolean,
        default: false
    }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;