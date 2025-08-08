import { getItems, addItems, updateItem } from "../Controllers/itemController.js";
import express from "express";

const itemRouter = express.Router();

itemRouter.get("/items", getItems);
itemRouter.post("/add", addItems);
itemRouter.patch("/update/:key", updateItem)

export default itemRouter;