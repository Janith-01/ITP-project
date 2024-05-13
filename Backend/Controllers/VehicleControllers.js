/*const Vehicle = require("../Model/VehicleModel");
//function for display data
const getAllVehicles = async (req, res, next) => {

    let Vehicles;
    //get all vehicles
    try{
        vehicles = await Vehicle.find();
    }catch (err) {
        console.log(err);
    }
    // not found
    if(!vehicles){
        return res.status(404).json({message:"Vehicle not found"});
    }
    //dispaly all vehicles
    return res.status(200).json({ vehicles });
};

//data insert
const addVehicles = async (req, res, next) => {

    const {vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo} = req.body;

    let vehicles;

    try {
        vehicles = new Vehicle({vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo});
        await vehicles.save();
    }catch (err) {
        console.log(err);
    }
    // not insert vehicles
    if (!vehicles){
        return res.status(404).json({message:"unable to add vehicles"});
    }
    return res.status(200).json({ vehicles });
};

//Get by Id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let vehicle;

    try {
        vehicle = await Vehicle.findById(id);
    }catch (err) {
        console.log(err);
    }
    // not available vehicles
    if (!vehicle){
        return res.status(404).json({message:"Vehicle not found"});
    }
    return res.status(200).json({ vehicle });

};

//Update Vehicle Details
const updateVehicle = async (req,res, next) => {
    const id = req.params.id;
    const {vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo} = req.body;

    let vehicles;
    
    try {
        vehicles = await Vehicle.findByIdAndUpdate(id,
        { vin: vin, regNo: regNo, make: make, model: model, year: year, ownerName: ownerName, ownerNic: ownerNic, ownerEmail: ownerEmail, ownerAddress: ownerAddress, contactNo: contactNo});
        vehicles = await vehicles.save();
    }catch(err) {
        console.log(err);
    }
    if (!vehicles){
        return res.status(404).json({message:"Unable to Update Vehicle Details"});
    }
    return res.status(200).json({ vehicles });
};

//Delete Vehicle Details
const deleteVehicle = async (req, res, next) => {
    const id = req.params.id;

    let vehicle;

    try{
        vehicle = await Vehicle.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!vehicle){
        return res.status(404).json({message:"Unable to Delete Vehicle Details"});
    }
    return res.status(200).json({ vehicle });
}




exports.getAllVehicles = getAllVehicles;
exports.addVehicles = addVehicles;
exports.getById = getById;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle = deleteVehicle;*/



import Vehicle from "../Model/VehicleModel.js";

const getAllVehicles = async (req, res, next) => {
    let vehicles;
    try {
        vehicles = await Vehicle.find();
    } catch (err) {
        console.log(err);
    }
    if (!vehicles) {
        return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(200).json({ vehicles });
};

const addVehicles = async (req, res, next) => {
    const { vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo } = req.body;
    let vehicles;
    try {
        vehicles = new Vehicle({ vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo });
        await vehicles.save();
    } catch (err) {
        console.log(err);
    }
    if (!vehicles) {
        return res.status(404).json({ message: "Unable to add vehicles" });
    }
    return res.status(200).json({ vehicles });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let vehicle;
    try {
        vehicle = await Vehicle.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(200).json({ vehicle });
};

const updateVehicle = async (req, res, next) => {
    const id = req.params.id;
    const { vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo } = req.body;
    let vehicles;
    try {
        vehicles = await Vehicle.findByIdAndUpdate(id,
            { vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo });
        vehicles = await vehicles.save();
    } catch (err) {
        console.log(err);
    }
    if (!vehicles) {
        return res.status(404).json({ message: "Unable to Update Vehicle Details" });
    }
    return res.status(200).json({ vehicles });
};

const deleteVehicle = async (req, res, next) => {
    const id = req.params.id;
    let vehicle;
    try {
        vehicle = await Vehicle.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!vehicle) {
        return res.status(404).json({ message: "Unable to Delete Vehicle Details" });
    }
    return res.status(200).json({ vehicle });
};

export { 
    getAllVehicles, 
    addVehicles, 
    getById, 
    updateVehicle, 
    deleteVehicle 
};
