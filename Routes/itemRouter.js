import { getItems, addItems, updateItem, deleteItem } from "../Controllers/itemController.js";
import express from "express";

const itemRouter = express.Router();

itemRouter.get("/items", getItems);
itemRouter.post("/add", addItems);
itemRouter.patch("/update/:key", updateItem);
itemRouter.delete("/delete/:key", deleteItem);

export default itemRouter;