import TotalIncome from '../models/TotalIncome.js';
import Sales from '../models/salesModel.js';
import ServiceHistory from '../models/ServiceHistoryModel.js'; 

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
      const sales = await Sales.find();
      const serviceHistory = await ServiceHistory.find();

      const totalSales = sales.reduce((acc, item) => acc + item.totalSales, 0);
      const totalServiceIncome = serviceHistory.reduce((acc, item) => acc + item.cost, 0);
      const totalIncome = totalSales + totalServiceIncome;

      return totalIncome;
    } catch (error) {
      console.error("Error calculating total income:", error.message);
      throw error;
    }
  }

  static async getTotalIncome(req, res) {
    try {
      const totalIncome = await TotalIncomeController.calculateTotalIncome();
      res.status(200).json({ totalIncome });
    } catch (error) {
      console.error("Error fetching total income:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default TotalIncomeController;
