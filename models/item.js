import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    key:{
        type : String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    Availability: {
        type: String,
        required: true,
        default: "In Stock",
        enum: ["In Stock", "Out of Stock", "Pre-order"]
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    demensions: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "any"
    }
})

//create a model
let item = mongoose.model("items_info", itemSchema);

export default item;