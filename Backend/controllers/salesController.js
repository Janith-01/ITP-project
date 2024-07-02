// salesController.js

import Sale from "../model/salesModel.js";



export const createSale = async (req, res) => {
  try {
    const { productId, productName, category, quantitySold, unitPrice, dateSold } = req.body;

    // Calculate totalSales
    const totalSales = quantitySold * unitPrice;

    // Create new sale instance with the computed totalSales
    const saleData = new Sale({
      productId,
      productName,
      category,
      quantitySold,
      unitPrice,
      dateSold,
      totalSales, // Store the computed value
    });

    const savedData = await saleData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSale = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantitySold, unitPrice } = req.body;

    // Compute updated totalSales if quantity or price is updated
    let updateFields = req.body;
    if (quantitySold !== undefined && unitPrice !== undefined) {
      updateFields.totalSales = quantitySold * unitPrice;
    }

    const updatedData = await Sale.findByIdAndUpdate(id, updateFields, { new: true });
    res.status(200).json({ msg: "updated Data Successfully", updatedData });
  } catch (error) {
    res.status(500).json({ error });
  }
};
// Get all Sales with virtuals
export const getAllSales = async (req, res) => {
  try {
    const saleData = await Sale.find().lean(); // Use lean to enhance performance
    if (!saleData || saleData.length === 0) {
      return res.status(404).json({ msg: "Sales data not found" });
    }

    // Explicitly calculate and include totalSales
    const saleDataWithTotalSales = saleData.map((sale) => ({
      ...sale,
      totalSales: sale.quantitySold * sale.unitPrice,
    }));

    res.status(200).json(saleDataWithTotalSales);
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
