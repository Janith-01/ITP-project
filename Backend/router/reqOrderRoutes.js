import express from 'express';
import { createReqOrder, getAllReqOrders, deleteReqOrder, updateReqOrder } from "../controllers/reqOrde.js";

const reqOrderRoutes = express.Router();

reqOrderRoutes.post('/create', createReqOrder);
reqOrderRoutes.get('/getAll', getAllReqOrders);
reqOrderRoutes.delete('/delete/:id', deleteReqOrder);
reqOrderRoutes.put('/update/:id', updateReqOrder);

export default reqOrderRoutes;
