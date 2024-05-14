import ServiceHistory from "../models/ServiceHistoryModel.js";

// Function to fetch income data
export const getIncomeData = async (req, res, next) => {
    try {
        const incomeData = await ServiceHistory.find({}, { vin: 1, cost: 1, category: 1 , date: 1 });
        res.json({ incomeData });
    } catch (error) {
        console.error("Error fetching income data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to get all service history records
export const getAllServicesHistory = async (req, res, next) => {
    try {
        const servicesHistory = await ServiceHistory.find();
        if (!servicesHistory || servicesHistory.length === 0) {
            return res.status(404).json({ message: "Service history not found" });
        }
        return res.status(200).json({ servicesHistory });
    } catch (err) {
        console.error("Error fetching service history:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Function to add a new service history record
export const addServicesHistory = async (req, res, next) => {
    const { vin, type, date, description, parts, cost, macanic } = req.body;
    try {
        const newServiceHistory = new ServiceHistory({ vin, type, date, description, parts, cost, macanic });
        await newServiceHistory.save();
        return res.status(201).json({ newServiceHistory });
    } catch (err) {
        console.error("Error adding service history:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Function to get a service history record by ID
export const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const serviceHistory = await ServiceHistory.findById(id);
        if (!serviceHistory) {
            return res.status(404).json({ message: "Service history not found" });
        }
        return res.status(200).json({ serviceHistory });
    } catch (err) {
        console.error("Error fetching service history by ID:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Function to update a service history record
export const updateServiceHistory = async (req, res, next) => {
    const id = req.params.id;
    const { vin, type, date, description, parts, cost, macanic } = req.body;
    try {
        let serviceHistory = await ServiceHistory.findByIdAndUpdate(
            id,
            { vin, type, date, description, parts, cost, macanic },
            { new: true }
        );
        if (!serviceHistory) {
            return res.status(404).json({ message: "Service history not found" });
        }
        return res.status(200).json({ serviceHistory });
    } catch (err) {
        console.error("Error updating service history:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Function to delete a service history record
export const deleteServiceHistory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const serviceHistory = await ServiceHistory.findByIdAndDelete(id);
        if (!serviceHistory) {
            return res.status(404).json({ message: "Service history not found" });
        }
        return res.status(200).json({ serviceHistory });
    } catch (err) {
        console.error("Error deleting service history:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
