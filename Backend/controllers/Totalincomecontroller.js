import TotalIncome from '../model/TotalIncome.js';
import Sales from '../model/salesModel.js'; 
import ServiceHistory from '../Model/ServiceHistoryModel.js';

class TotalIncomeController {
  static async saveTotalIncome(req, res) {
    const { totalIncome } = req.body;
    try {
      const newTotalIncome = new TotalIncome({
        totalIncome,
      });
      await newTotalIncome.save();
      res.status(200).json({ message: "Total income saved successfully" });
    } catch (error) {
      console.error("Error saving total income:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async calculateTotalIncome() {
    try {
      // Calculate total sales
      const sales = await Sales.find();
      const totalSales = sales.reduce((acc, item) => acc + (item.quantitySold * item.unitPrice), 0);

      // Calculate total service income
      const serviceHistory = await ServiceHistory.find();
      const totalServiceIncome = serviceHistory.reduce((acc, item) => acc + item.cost, 0);

      // Calculate total income
      const totalIncome = totalSales + totalServiceIncome;

      console.log("Total income:", totalIncome);
      return totalIncome;
    } catch (error) {
      console.error("Error calculating total income:", error.message);
      throw error;
    }
  }

  static async getTotalIncome(req, res) {
    try {
      const totalIncome = await TotalIncomeController.calculateTotalIncome();
      const existingTotalIncome = await TotalIncome.findOne();
      if (existingTotalIncome) {
        existingTotalIncome.totalIncome = totalIncome;
        await existingTotalIncome.save();
      } else {
        const newTotalIncome = new TotalIncome({ totalIncome });
        await newTotalIncome.save();
      }
      res.status(200).json({ totalIncome });
    } catch (error) {
      console.error("Error fetching total income:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default TotalIncomeController;
