import axios from 'axios';

// Function to fetch total income
export const getTotalIncome = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/totalIncome');
    return response.data.totalIncome;
  } catch (error) {
    console.error('Error fetching total income:', error.message);
    throw new Error('Failed to fetch total income');
  }
};

// Function to fetch total expense
export const getTotalExpense = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/totalExpense');
    return response.data.totalExpense;
  } catch (error) {
    console.error('Error fetching total expense:', error.message);
    throw new Error('Failed to fetch total expense');
  }
};
