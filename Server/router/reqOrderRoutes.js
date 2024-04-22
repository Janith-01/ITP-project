// Import necessary modules
import express from 'express';
import cors from 'cors';
import { createReqOrder, getAllReqOrders, deleteReqOrder, updateReqOrder } from '../controllers/reqOrderController';

// Create router instance
const router = express.Router();

// Apply CORS middleware
router.use(
    cors({
        origin: 'http://localhost:8083',
        credentials: true
    })
);

// Define routes
router.post('/reqOrder', createReqOrder);
router.get('/reqOrders', getAllReqOrders);
router.delete('/reqOrder/:id', deleteReqOrder);
router.put('/reqOrder/:id', updateReqOrder);

// Export router
export default router;
