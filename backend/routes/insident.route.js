import express from 'express';
import {
    createInsident,
    getInsidentById,
    getAllInsidents,
    updateInsident,
    deleteInsident
} from '../controllers/insident.controller.js';

const router = express.Router();

router.post('/create', createInsident);
router.get('/:id', getInsidentById);
router.get('/', getAllInsidents);
router.put('/update:id', updateInsident);
router.delete('/delete:id', deleteInsident);

export default router;
