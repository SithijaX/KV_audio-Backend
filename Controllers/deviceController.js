import Device from "../models/deviceInfo.js";

export async function getDevice(req,res){

    try {
        const finded_devices = await Device.find();
        res.json(finded_devices);

  
    } catch (error) {
        res.status(500).json({
            message: "Error fetching devices",
            error: error.message
        });
    }
}


export async function addProducts(req,res){
    console.log("post request working successfully!");

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
    try {
        let newDevice = new Device(req.body);
        await newDevice.save();
        res.json({
            msg : "new " + req.body.name + " saved successfully!"
        });
        console.log(req.user);
        console.log(newDevice);
    } catch (error) {
        res.status(500).json({
            message: "Error saving device",
            error: error.message
        });
    }
}
