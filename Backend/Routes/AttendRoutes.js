import express from 'express';
import Attend from '../Model/Attend.js';

const router = express.Router();

// Get all attendance records
router.get('/', async (req, res) => {
    try {
        const attendances = await Attend.find();
        res.json(attendances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single attendance record by ID
router.get('/:id', async (req, res) => {
    try {
        const attendance = await Attend.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create an attendance record
router.post('/', async (req, res) => {
    const { Eid, Date, Stime, Etime } = req.body;
    try {
        // Create new attendance record
        const newAttendance = await Attend.create({
            Eid,
            Date,
            Stime,
            Etime,
        });
        res.status(201).json(newAttendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an attendance record by ID
router.delete('/:id', async (req, res) => {
    try {
        const attendance = await Attend.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.json({ message: 'Attendance record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;