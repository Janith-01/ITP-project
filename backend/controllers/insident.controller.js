import Insident from '../models/insident.model.js';

// Create a new Insident
export const createInsident = async (req, res) => {
    try {
        const insident = new Insident(req.body);
        await insident.save();
        res.status(201).json(insident);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        res.json(insidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Insident
export const updateInsident = async (req, res) => {
    try {
        const insident = await Insident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!insident) {
            return res.status(404).json({ message: 'Insident not found' });
        }
        res.json(insident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an Insident
export const deleteInsident = async (req, res) => {
    try {
        const insident = await Insident.findByIdAndDelete(req.params.id);
        if (!insident) {
            return res.status(404).json({ message: 'Insident not found' });
        }
        res.json({ message: 'Insident deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
