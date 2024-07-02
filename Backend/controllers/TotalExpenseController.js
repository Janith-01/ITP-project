import ExtraExpense from "../model/ExtraExpenseModel.js";
import SalaryAdd from "../model/SalaryAdd.js";
import TotalExpense from "../model/TotalExpense.js";

class TotalExpenseController {
  static async saveTotalExpense(req, res) {
    try {
      const totalExpense = await TotalExpenseController.calculateTotalExpense();
      
      const newTotalExpense = new TotalExpense({
        totalExpense,
      });
      await newTotalExpense.save();

      res.status(200).json({ totalExpense }); 
    } catch (error) {
      console.error("Error saving total expense:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async calculateTotalExpense() {
    try {
      const salaries = await SalaryAdd.find();
      const extraExpenses = await ExtraExpense.find();

      const totalSalaries = salaries.reduce((acc, item) => acc + item.Total, 0);
      const totalExtraExpenses = extraExpenses.reduce((acc, item) => acc + item.amount, 0);
      const totalExpense = totalSalaries + totalExtraExpenses;

      return totalExpense;
    } catch (error) {
      console.error("Error calculating total expense:", error.message);
      throw error;
    }
  }

  static async getTotalExpense(req, res) {
    try {
      const totalExpense = await TotalExpenseController.calculateTotalExpense();
      res.status(200).json({ totalExpense });
    } catch (error) {
      console.error("Error fetching total expense:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default TotalExpenseController; 
