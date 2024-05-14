/*const ServiceHistory = require("../Model/ServiceHistoryModel");
//function for display data
const getAllServicesHistory = async (req, res, next) => {

    let ServicesHistory;
    //get all vehicles
    try{
        serviceshistory = await ServiceHistory.find();
    }catch (err) {
        console.log(err);
    }
    // not found
    if(!serviceshistory){
        return res.status(404).json({message:"Service History not found"});
    }
    //dispaly all vehicles
    return res.status(200).json({ serviceshistory });
};

//data insert
const addServicesHistory = async (req, res, next) => {

    const {vin, type, date, description, parts, cost, macanic} = req.body;

    let serviceshistory;

    try {
        serviceshistory = new ServiceHistory({vin, type, date, description, parts, cost, macanic});
        await serviceshistory.save();
    }catch (err) {
        console.log(err);
    }
    // not insert vehicles
    if (!serviceshistory){
        return res.status(404).json({message:"unable to add Service History"});
    }
    return res.status(200).json({ serviceshistory });
};

//Get by Id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let servicehistory;

    try {
        servicehistory = await ServiceHistory.findById(id);
    }catch (err) {
        console.log(err);
    }
    // not available vehicles
    if (!servicehistory){
        return res.status(404).json({message:"Service History not found"});
    }
    return res.status(200).json({ servicehistory });

};

//Update Vehicle Details
const updateServiceHistory = async (req,res, next) => {
    const id = req.params.id;
    const {vin, type, date, description, parts, cost, macanic} = req.body;

    let serviceshistory;
    
    try {
        serviceshistory = await ServiceHistory.findByIdAndUpdate(id,
        { vin: vin, type: type, date: date, description: description, parts: parts, cost: cost, mananic: macanic});
        serviceshistory = await serviceshistory.save();
    }catch(err) {
        console.log(err);
    }
    if (!serviceshistory){
        return res.status(404).json({message:"Unable to Update Service History Details"});
    }
    return res.status(200).json({ serviceshistory });
};

//Delete Vehicle Details
const deleteServiceHistory = async (req, res, next) => {
    const id = req.params.id;

    let servicehistory;

    try{
        servicehistory = await ServiceHistory.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!servicehistory){
        return res.status(404).json({message:"Unable to Delete Service History Details"});
    }
    return res.status(200).json({ servicehistory });
}

///*** */
// Calculate total cost by month
/*const getTotalCostByMonth = async (req, res, next) => {
    try {
      const totalCostByMonth = await ServiceHistory.aggregate([
        {
          $group: {
            _id: { $month: "$date" },
            totalCost: { $sum: { $toDouble: "$cost" } }
          }
        }
      ]);
      res.status(200).json(totalCostByMonth);
    } catch (err) {
      console.error("Error fetching total cost by month:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };




exports.getAllServicesHistory = getAllServicesHistory;
exports.addServicesHistory = addServicesHistory;
exports.getById = getById;
exports.updateServiceHistory = updateServiceHistory;
exports.deleteServiceHistory = deleteServiceHistory;
exports.getTotalCostByMonth = getTotalCostByMonth;*/

import ServiceHistory from "../Model/ServiceHistoryModel.js";

const getAllServicesHistory = async (req, res, next) => {
    let servicesHistory;
    try {
        servicesHistory = await ServiceHistory.find();
    } catch (err) {
        console.log(err);
    }
    if (!servicesHistory) {
        return res.status(404).json({ message: "Service History not found" });
    }
    return res.status(200).json({ servicesHistory });
};

const addServicesHistory = async (req, res, next) => {
    const { vin, type, date, description, parts, cost, macanic } = req.body;
    let servicesHistory;
    try {
        servicesHistory = new ServiceHistory({ vin, type, date, description, parts, cost, macanic });
        await servicesHistory.save();
    } catch (err) {
        console.log(err);
    }
    if (!servicesHistory) {
        return res.status(404).json({ message: "Unable to add Service History" });
    }
    return res.status(200).json({ servicesHistory });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let serviceHistory;
    try {
        serviceHistory = await ServiceHistory.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!serviceHistory) {
        return res.status(404).json({ message: "Service History not found" });
    }
    return res.status(200).json({ serviceHistory });
};

const updateServiceHistory = async (req, res, next) => {
    const id = req.params.id;
    const { vin, type, date, description, parts, cost, macanic } = req.body;
    let servicesHistory;
    try {
        servicesHistory = await ServiceHistory.findByIdAndUpdate(id,
            { vin, type, date, description, parts, cost, macanic });
        servicesHistory = await servicesHistory.save();
    } catch (err) {
        console.log(err);
    }
    if (!servicesHistory) {
        return res.status(404).json({ message: "Unable to Update Service History Details" });
    }
    return res.status(200).json({ servicesHistory });
};

const deleteServiceHistory = async (req, res, next) => {
    const id = req.params.id;
    let serviceHistory;
    try {
        serviceHistory = await ServiceHistory.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
    }
    if (!serviceHistory) {
        return res.status(404).json({ message: "Unable to Delete Service History Details" });
    }
    return res.status(200).json({ serviceHistory });
};

/*const getTotalCostByMonth = async (req, res, next) => {
    try {
        const totalCostByMonth = await ServiceHistory.aggregate([
            {
                $group: {
                    _id: { $month: "$date" },
                    totalCost: { $sum: { $toDouble: "$cost" } }
                }
            }
        ]);
        res.status(200).json(totalCostByMonth);
    } catch (err) {
        console.error("Error fetching total cost by month:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};*/

export { 
    getAllServicesHistory, 
    addServicesHistory, 
    getById, 
    updateServiceHistory, 
    deleteServiceHistory, 
    //getTotalCostByMonth 
};
