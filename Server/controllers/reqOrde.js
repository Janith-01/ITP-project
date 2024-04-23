// Import mongoose and the model
import ReqOrder from '../model/reqOrderModel.js';

// Create reqOrder controller
export const createReqOrder = async (req, res) => {
    try {
        const data = await ReqOrder.create(req.body);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get all reqOrders controller
export const getAllReqOrders = async (req, res) => {
    try {
        const data = await ReqOrder.find();
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Delete reqOrder controller
export const deleteReqOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ReqOrder.findByIdAndDelete(id);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Update reqOrder controller
export const updateReqOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ReqOrder.findByIdAndUpdate(id, req.body, { new: true });
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
