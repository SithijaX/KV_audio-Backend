import express from "express";
import { addReview, getReviews, deleteReview, approveReview } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", addReview);
reviewRouter.get("/reviews", getReviews);
reviewRouter.delete("/delete/:email", deleteReview); 
reviewRouter.put("/approve/:email", approveReview);

export default reviewRouter;