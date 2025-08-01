import mongoose from "mongoose";

const deviceSchema = mongoose.Schema({
    id : String,
    name : String,
    Availability : Boolean,
    Price : Number
})

//create a model
let Device = mongoose.model("Device_info", deviceSchema);

export default Device;