import { getItems, addItems } from "../Controllers/itemController.js";
import express from "express";

const itemRouter = express.Router();

itemRouter.get("/items", getItems);
itemRouter.post("/add", addItems);

export default itemRouter;