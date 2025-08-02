import express from "express";
import { addReview } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", addReview)

export default reviewRouter;