import { getDevice, addProducts } from "../Controllers/deviceController.js";
import express from "express";

let deviceRouter = express.Router();

deviceRouter.get("/list", getDevice);
deviceRouter.post("/add", addProducts);

export default deviceRouter;