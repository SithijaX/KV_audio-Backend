import express from "express";
import { addReview, getReviews } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", addReview);
reviewRouter.get("/reviews", getReviews);

export default reviewRouter;