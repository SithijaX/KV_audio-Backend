import express from "express";
import { addInquiry, viewInquiries, deleteInquiry } from "../Controllers/inquiryController.js";

const router = express.Router();

router.post("/add", addInquiry);
router.get("/inquiries", viewInquiries);
router.delete("/delete", deleteInquiry);

export default router;
