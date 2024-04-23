import express from 'express';
import { createReqOrder, getAllReqOrders, deleteReqOrder, updateReqOrder } from "../controllers/reqOrde.js";

const router = express.Router();

router.post('/reqOrder', createReqOrder);
router.get('/reqOrders', getAllReqOrders);
router.delete('/reqOrder/:id', deleteReqOrder);
router.put('/reqOrder/:id', updateReqOrder);

export default router;
