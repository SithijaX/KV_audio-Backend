import express from "express";
import { addInquiry } from "../Controllers/inquiryController.js";

const router = express.Router();

router.post("/add", addInquiry);

export default router;
