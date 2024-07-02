import express from "express";
import {create, getAll,getOne,update,deleteOrder} from "../controller/reqOrderController.js";
import { body } from "express-validator";

const orderValidation = [
    body('Request_ID').isAlphanumeric().withMessage('Request ID should contain only letters and numbers'),
    body('Product_Name').matches(/^[a-zA-Z\s]+$/).withMessage('Product Name should contain only letters and spaces'),
    //body('Product_Name').isAlpha().withMessage('Product Name should contain only letters'),
    body('Quantity').isNumeric().withMessage('Quantity should be a number').isFloat({ min: 0 }).withMessage('Quantity should not be less than 0'),
    body('Requested_Date').isDate().withMessage('Requested_Date should be a date '),
    body('Status').matches(/^[a-zA-Z\s]+$/).withMessage('Status should contain only letters and spaces'),
]


const reqOrderRoutes = express.Router();

reqOrderRoutes.post("/create", orderValidation,create);
reqOrderRoutes.get("/getAll",getAll);
reqOrderRoutes.get("/getOne/:id",getOne);
reqOrderRoutes.put("/update/:id", orderValidation,update);
reqOrderRoutes.delete("/delete/:id",deleteOrder)

export default reqOrderRoutes;