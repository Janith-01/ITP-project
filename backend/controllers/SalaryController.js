import Salary from "../models/SalaryAdd.js";

// Controller function to add salary details
export const addSalary = async (req, res) => {
    try {
        // Add the new salary entry
        const newSalary = new Salary(req.body);
        await newSalary.save();

        res.status(201).json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ status: "err", message: error.message });
    }
};

// Controller function to get all salary details
export const getAllSalary = async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.status(200).json({ status: "ok", data: salaries });
    } catch (error) {
        res.status(500).json({ status: "err", message: error.message });
    }
};

// Controller function to get a salary entry by ID
export const getSalaryById = async (req, res) => {
    const id = req.params.id;
    try {
        const salary = await Salary.findById(id);
        if (!salary) {
            return res.status(404).json({ status: "err", message: "Salary not found" });
        }
        res.status(200).json({ status: "ok", data: salary });
    } catch (error) {
        res.status(500).json({ status: "err", message: error.message });
    }
};

// Controller function to update a salary entry by ID
export const updateSalary = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        // Use { new: true } option to return the updated document
        const updatedSalary = await Salary.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedSalary) {
            return res.status(404).json({ status: "err", message: "Salary not found" });
        }
        res.status(200).json({ status: "ok", data: updatedSalary, message: "Salary updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "err", message: error.message });
    }
};

// Controller function to delete a salary entry by ID
export const deleteSalary = async (req, res) => {
    const id = req.params.id;
    try {
        // Find the salary entry to be deleted
        await Salary.findByIdAndDelete(id);
        res.status(200).json({ status: "ok", message: "Salary deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "err", message: error.message });
    }
};
