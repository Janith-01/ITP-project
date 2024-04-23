import express from 'express';
import {
    createReportinginsident,
    getReportinginsidentById,
    getAllReportinginsidents
} from '../controllers/reportinginsident.controller.js';

const router = express.Router();

router.post('/create', createReportinginsident);
router.get('/:id', getReportinginsidentById);
router.get('/', getAllReportinginsidents);

export default router;
