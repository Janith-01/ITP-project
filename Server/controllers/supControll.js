import Supplier from '../model/supplierSchema.js';

// Create a new supplier
export const createSupplier = async (req, res) => {
    try {
        const { name, contactNumber, emailAddress, supplyingGoods } = req.body;
        const existingSupplier = await Supplier.findOne({ emailAddress });
        if (existingSupplier) {
            return res.status(400).json({ message: "Supplier with this email already exists" });
        }
        const newSupplier = new Supplier({ name, contactNumber, emailAddress, supplyingGoods });
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: "Could not create supplier", error: error.message });
    }
};

// Get all suppliers
export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch suppliers", error: error.message });
    }
};

// Get a single supplier by ID
export const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch supplier", error: error.message });
    }
};

// Update a supplier by ID
export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: "Could not update supplier", error: error.message });
    }
};

// Delete a supplier by ID
export const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(deletedSupplier);
    } catch (error) {
        res.status(500).json({ message: "Could not delete supplier", error: error.message });
    }
};
