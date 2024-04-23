import Reportinginsident from "../models/reportinginsident.model.js";

// Create a new Reprting Insident
export const createReportinginsident = async (req, res, next) => {
    console.log(req.body);
    const { ownerName, phone, vehicleNumber,location,emergencyType} = req.body;
    const newReportinginsident = new Reportinginsident({ ownerName, phone, vehicleNumber,location,emergencyType });
    try {
        await newReportinginsident.save();
        res.status(201).json({ message: "Reporting Insident created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get a single Reprting Insident by ID
export const getReportinginsidentById = async (req, res) => {
    try {
        const reportinginsident = await Reportinginsident.findById(req.params.id);
        if (!reportinginsident) {
            return res.status(404).json({ message: 'Reporting Insident not found' });
        }
        res.json(reportinginsident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Reprting Insidents
export const getAllReportinginsidents = async (req, res) => {
    try {
        const reportinginsidents = await Reportinginsident.find();
        res.status(200).json(reportinginsidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



