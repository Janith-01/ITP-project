// salesController.js

import Sale from "../model/salesModel.js";

// Create Sale
export const createSale = async (req, res) => {
  try {
    // Validate request body
    const { productId, productName, category, quantitySold, unitPrice, dateSold } = req.body;
    if (!productId || !productName || !category || !quantitySold || !unitPrice || !dateSold) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof quantitySold !== "number" || quantitySold <= 0) {
      return res.status(400).json({ message: "Quantity should be a number and greater than 0" });
    }

    // Create new sale instance
    const saleData = new Sale({ productId, productName, category, quantitySold, unitPrice, dateSold });

    // Save sale data
    const savedData = await saleData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Sale
export const updateSale = async (req, res) => {
  try {
    const id = req.params.id;
    const saleDataExist = await Sale.findById(id);
    if (!saleDataExist) {
      return res.status(401).json({ msg: "Sales data not found" });
    }

    const updatedData = await Sale.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "updated Data Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all Sales
export const getAllSales = async (req, res) => {
  try {
    const saleData = await Sale.find();
    if (!saleData || saleData.length === 0) {
      return res.status(404).json({ msg: "Sales data not found" });
    }
    res.status(200).json(saleData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get Sale by ID
export const getSaleById = async (req, res) => {
  try {
    const id = req.params.id;
    const saleExist = await Sale.findById(id);
    if (!saleExist) {
      return res.status(404).json({ msg: "Sale Data not found" });
    }
    res.status(200).json(saleExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete Sale
export const deleteSale = async (req, res) => {
  try {
    const id = req.params.id;
    const saleExist = await Sale.findById(id);
    if (!saleExist) {
      return res.status(404).json({ msg: "Sale data not exist" });
    }
    // Delete the Sale item
    await Sale.findByIdAndDelete(id);
    res.status(200).json({ msg: "Sale Data deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
 
};

// salesController.js
export const getSalesByMonth = async (req, res) => {
  try {
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required." });
    }

    // Fetch sales for the specified month
    const salesData = await Sale.find({
      dateSold: {
        $gte: new Date(year, month - 1, 1), // Start of the month
        $lt: new Date(year, month, 1), // Start of the next month
      },
    });

    if (!salesData.length) {
      return res.status(404).json({ message: "No sales data found for the specified month." });
    }

    // Calculate total sales
    const totalSales = salesData.reduce(
      (acc, sale) => acc + sale.quantitySold * sale.unitPrice,
      0
    );

    res.status(200).json({
      sales: salesData,
      totalSales,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
