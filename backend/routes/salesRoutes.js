import express from 'express';
import { createSale, getAllSales, getSaleById, updateSale, deleteSale, getSalesByMonth, getSelectedFieldsFromAllSales } from "../controllers/salesController.js";
import { body } from "express-validator";

// Validation part
const salesValidation = [
    body('productId').isAlphanumeric().withMessage('Product ID should contain only letters and numbers'),
    body('productName').matches(/^[a-zA-Z\s]+$/).withMessage('Product Name should contain only letters and spaces'),
    body('category').matches(/^[a-zA-Z\s]+$/).withMessage('category should contain only letters and spaces'),
    body('quantitySold').isNumeric().withMessage('Quantity should be a number').isFloat({ min: 0 }).withMessage('Quantity should not be less than 0'),
    body('unitPrice').isNumeric().withMessage('Unit Price should be a number').isFloat({ min: 0 }).withMessage('Unit Price should not be less than 0'),
];

const salesRoute = express.Router();

salesRoute.post("/add", salesValidation, createSale);
salesRoute.get("/getAll", getAllSales);
salesRoute.get("/getOne/:id", getSaleById);
salesRoute.put("/updateSale/:id", salesValidation, updateSale);
salesRoute.delete("/deleteSale/:id", deleteSale);
salesRoute.get("/getSalesByMonth", getSalesByMonth);
salesRoute.get("/getSelectedfeilds", getSelectedFieldsFromAllSales);

export default salesRoute;
