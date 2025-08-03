import express from "express";
import { addReview, getReviews, deleteReview } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", addReview);
reviewRouter.get("/reviews", getReviews);
reviewRouter.delete("/delete/:email", deleteReview); // Assuming deleteReview is defined in the controller

export default reviewRouter;