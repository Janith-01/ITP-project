import ReqOrder from '../model/reqOrderModel.js';

export const createReqOrder = async (req, res) => {
    try {
        const data = await ReqOrder.create(req.body);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getAllReqOrders = async (req, res) => {
    try {
        const data = await ReqOrder.find();
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const deleteReqOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ReqOrder.findByIdAndDelete(id);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const updateReqOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ReqOrder.findByIdAndUpdate(id, req.body, { new: true });
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
