import express from 'express';
import LeaveRequest from '../Model/leaverequest.js';

const router = express.Router();

// Get all leave requests
router.get('/', async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.find();
        res.json(leaveRequests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single leave request by ID
router.get('/:id', async (req, res) => {
    try {
        const leaveRequest = await LeaveRequest.findById(req.params.id);
        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        res.json(leaveRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a leave request
router.post('/', async (req, res) => {
    const { name, Eid, lType, sdate, edate, reason, status } = req.body;
    try {
        const newRequest = await LeaveRequest.create({
            name,
            Eid,
            lType,
            sdate,
            edate,
            reason,
            status,
        });
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a leave request
router.put('/:id', async (req, res) => {
    try {
        const { name, Eid, lType, sdate, edate, reason, status } = req.body;
        const updatedRequest = await LeaveRequest.findByIdAndUpdate(
            req.params.id,
            { name, Eid, lType, sdate, edate, reason, status },
            { new: true }
        );
        if (!updatedRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        res.json(updatedRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a leave request
router.delete('/:id', async (req, res) => {
    try {
        const deletedRequest = await LeaveRequest.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        res.json({ message: 'Leave request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;