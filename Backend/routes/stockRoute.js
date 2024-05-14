import express from "express";
import { create, deleteStock, getAll, getOne, update } from "../controller/stockController.js";
import { body } from "express-validator";

//validation part
const productValidation = [
  body('productId').isAlphanumeric().withMessage('Product ID should contain only letters and numbers'),
  //  body('productName').isAlpha().withMessage('Product Name should contain only letters'),
  body('productName').matches(/^[a-zA-Z\s]+$/).withMessage('Product Name should contain only letters and spaces'),
  body('category').matches(/^[a-zA-Z\s]+$/).withMessage('category should contain only letters and spaces'),
  //body('category').isAlpha().withMessage('Category should contain only letters'),
  body('quantity').isNumeric().withMessage('Quantity should be a number').isFloat({ min: 0 }).withMessage('Quantity should not be less than 0'),
  body('unitPrice').isNumeric().withMessage('Unit Price should be a number').isFloat({ min: 0 }).withMessage('Unit Price should not be less than 0'),
];

const route = express.Router();

//routes
route.post("/create", productValidation, create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", productValidation, update);
route.delete("/delete/:id", deleteStock);

export default route;
