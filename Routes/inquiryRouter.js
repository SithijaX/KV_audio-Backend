import express from "express";
import { addInquiry, viewInquiries } from "../Controllers/inquiryController.js";

const router = express.Router();

router.post("/add", addInquiry);
router.get("/inquiries", viewInquiries);

export default router;
