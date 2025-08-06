import mongoose from "mongoose";

const deviceSchema = mongoose.Schema({
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
        default: "In Stock"
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
let Device = mongoose.model("Device_info", deviceSchema);

export default Device;