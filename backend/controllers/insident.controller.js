import Insident from "../models/insident.model.js";

// Create a new Insident
export const createInsident = async (req, res, next) => {
    console.log(req.body);
    const { ownerName, nic, phone, email,vehicleNumber,vehicleType,location,emergencyType,damageType,status,estimatedCost} = req.body;
    const newInsident = new Insident({ ownerName, nic, phone, email,vehicleNumber,vehicleType,location,emergencyType,damageType,status,estimatedCost });
    try {
        await newInsident.save();
        res.status(201).json({ message: "Insident created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get a single Insident by ID
export const getInsidentById = async (req, res) => {
    try {
        const insident = await Insident.findById(req.params.id);
        if (!insident) {
            return res.status(404).json({ message: 'Insident not found' });
        }
        res.json(insident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Insidents
export const getAllInsidents = async (req, res) => {
    try {
        const insidents = await Insident.find();
        res.status(200).json(insidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Insident
export const updateInsident = async (req,res) =>{
    const { id } = req.params;
    const {ownerName,nic,phone,email,vehicleNumber,vehicleType,location,emergencyType,damageType,status,estimatedCost} = req.body;

    try{
        const insident = await Insident.findById(id);
        if(!Insident){
            return res.status(404).json({ message:"Insident not found"});
        }
        insident.ownerName = ownerName;
        insident.nic = nic;
        insident.phone = phone;
        insident.email = email;
        insident.vehicleNumber = vehicleNumber;
        insident.vehicleType = vehicleType;
        insident.location = location;
        insident.emergencyType = emergencyType;
        insident.damageType = damageType;
        insident.status = status;
        insident.estimatedCost =estimatedCost;

        const updateInsident = await insident.save();
        res.status(200).json(updateInsident);
    }catch (error) {
        console.error('Error while updating the user', error);
        res.status(500).json({message: 'Internal server error'})
    }
};

// Delete an Insident
export const deleteInsident = async (req,res) => {
    try {
        const insidentId = req.params.id;
        const insident = await Insident.findById(insidentId);
        if(!insident){
            return res.status(404).json({message: 'Insident not found0'});
        }
        await Insident.findByIdAndDelete(insidentId);
        res.status(200).json({message: 'Insident Deleted Successfully'})
    } catch(error) {
        console.error('Error occured while deleting the user', error);
        res.status(500).json({message:'Internal Server Error'});
    }
};
