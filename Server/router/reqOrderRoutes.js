// Import necessary modules
import express from 'express';
import { Router } from "express";
import { createReqOrder, getAllReqOrders, deleteReqOrder, updateReqOrder } 
                from "../controllers/reqOrde.js";

// Create router instance
const router = express.Router();

// Apply CORS middleware


// Define routes
router.post('/reqOrder', createReqOrder);
router.get('/reqOrders', getAllReqOrders);
router.delete('/reqOrder/:id', deleteReqOrder);
router.put('/reqOrder/:id', updateReqOrder);

// Export router
export default router;
