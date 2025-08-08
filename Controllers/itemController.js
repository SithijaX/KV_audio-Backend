import item from "../models/item.js";
import { isAdmin } from "./userController.js"; // Importing the isAdmin function

// Function to get items

export async function getItems(req,res){

    try {
        if(isAdmin(req)){
            // If the user is an admin, return all items
            const foundItems = await item.find();
            res.json(foundItems);
            return;
        } else {
            const foundItems = await item.find({Availability: "In Stock"});
            res.json(foundItems);
            return;
        }

    } catch (error) {
        res.status(500).json({
            message: "Error fetching items 😕",
            error: error.message
        });
    }
}


export async function addItems(req,res){

    // Check if the user is authenticated
    if(req.user == null){
        return res.status(401).json({msg: "please login and try again!"});
        return;
    }
    // Check if the user has the required role
    if(req.user.role !== "admin"){
        return res.status(403).json({msg: "You are not authorized to add products!"});
        return;
    }
    // Proceed to add the product
    console.log(req.body);

    try{
        let savedItems;

        //Handle multiple items or singles
        if(Array.isArray(req.body)){
            savedItems = await item.insertMany(req.body);
        }else {
            const newItem = new item(req.body);
            savedItems = await newItem.save();
        }

        res.status(200).json({
            msg : "Items added successfully!",
            items: savedItems
        });

        console.log("Saved Items : ",savedItems);
        console.log("Added by: ", req.user);
    }
    catch(error){
        res.status(500).json({
            message: "Error saving items😒",
            error: error.message
        })
    }

// handling single item addition (uncomment if needed)
 /*   try {
        let newItem = new item(req.body);
        await newItem.save();
        res.json({
            msg : "new " + req.body.name + " saved successfully!"
        });
        console.log(req.user);
        console.log(newItem);
    } catch (error) {
        res.status(500).json({
            message: "Error saving items😒",
            error: error.message
        });
    }         */
}


export async function updateItem(req,res){
    // Check if the user is authenticated
    if(isAdmin(req)){
        return res.status(403).json({msg: "You are not authorized to update products!"});
    }

    try {
            const key = req.params.key;
            const updateData = req.body;

            const updatedItem = await item.updateone({key: key}, updateData);

            res.status(200).json({
                msg: "Item updated successfully 👍",
                item: updatedItem
            });

    } catch (error) {
        res.status(500).json({
            message: "Error updating item 😕",
            error: error.message
        });
    }


}