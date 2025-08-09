import express from "express";
import { addInquiry, viewInquiries, deleteInquiry, updateInquiry } from "../Controllers/inquiryController.js";

const router = express.Router();

router.post("/add", addInquiry);
router.get("/inquiries", viewInquiries);
router.delete("/delete/:id", deleteInquiry);
router.put("/update/:id", updateInquiry);

export default router;
