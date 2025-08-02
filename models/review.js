import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true},
    name: {
        type: String,
        required: true},
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5},
    comment: {
        type: String,
        required: true},
    date : {
        type: Date,
        required: true,
        default: Date.now},
    profileImage: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
        required: true} 
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;