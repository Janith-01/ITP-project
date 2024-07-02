import express from 'express';
import { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } from '../controllers/supControll.js';

const router = express.Router();

// Create a new supplier
router.post('/supplier', createSupplier);

// Get all suppliers
router.get('/suppliers', getAllSuppliers);

// Get a single supplier by ID
router.get('/supplier/:id', getSupplierById);

// Update a supplier by ID
router.put('/supplier/:id', updateSupplier);

// Delete a supplier by ID
router.delete('/supplier/:id', deleteSupplier);

export default router;
