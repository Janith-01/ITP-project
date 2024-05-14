// stockController.js

import Stock from "../model/stockModel.js";
import Notification from "../model/notificationModel.js";
import { validationResult } from 'express-validator';

export const getAll = async(req,res)=>{
    try {
        const stockData = await Stock.find();

        if(!stockData){
            return res.status(404).json({msg: "Stocks data not found"});
        }

        res.status(200).json(stockData);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const getOne = async (req,res)=>{
    try {
        const id = req.params.id;
        const stockExist = await Stock.findById(id);
        if(!stockExist){
            return res.status(404).json({msg:"Stock not found"});
        }

        res.status(200).json(stockExist);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}


export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const stockData = new Stock(req.body);

        if (stockData.quantity <= 15) {
            stockData.status = "out of stock";
            await Notification.create({ message: `${stockData.productName} is out of stock` });
        }

        const savedData = await stockData.save();
        res.status(200).json({ msg: "Stock Created" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;
        const { quantity } = req.body;
        const stockExist = await Stock.findById(id);
        if (!stockExist) {
            return res.status(404).json({ msg: "Stock not found" });
        }

        const updatedData = await Stock.findByIdAndUpdate(id, req.body, { new: true });
        if (quantity <= 15 && updatedData.status !== "out of stock") {
            updatedData.status = "out of stock";
            await Notification.create({ message: `${updatedData.productName} is out of stock` });
        } else if (quantity > 15 && updatedData.status === "out of stock") {
            updatedData.status = "in stock";
            await Notification.deleteMany({ message: `${updatedData.productName} is out of stock` });
        }

        await updatedData.save();

        res.status(200).json({ msg: "Stock updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const deleteStock = async (req, res) => {
    try {
        const id = req.params.id;
        const stockExist = await Stock.findById(id);
        if (!stockExist) {
            return res.status(404).json({ msg: "Stock not exist" });
        }

        // Delete the stock item
        await Stock.findByIdAndDelete(id);

        // Remove corresponding notification
        await Notification.deleteMany({ message: `${stockExist.productName} is out of stock` });

        res.status(200).json({ msg: "Stock deleted Successfully" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}
