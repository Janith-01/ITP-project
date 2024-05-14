import NewEmpModel from "../Model/NewEmpModel.js";

// Controller function to create a new employee
export const createNewEmployee = async (req, res) => {
  const { name, gmail, jobRole, Eid } = req.body;
  try {
    await NewEmpModel.create({
      name,
      gmail,
      jobRole,
      Eid,
    });
    res.status(201).json({ status: "ok" });
  } catch (err) {
    console.error("Error creating new employee:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Controller function to get all new employee details
export const getAllNewEmpDetails = async (req, res) => {
    try {
      const newEmpDetails = await NewEmpModel.find();
      res.status(200).json({ success: true, data: newEmpDetails });
    } catch (error) {
      console.error("Error fetching new employee details:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
};

// Controller function to get a single employee record by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await NewEmpModel.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to delete a specific employee by ID
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await NewEmpModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

//____________________________________________--
// Controller function to authenticate user
// export const authenticateUser = async (req, res) => {
//   const { email, managerId } = req.body;
//   try {
//     // Assuming NewEmpModel has a field 'jobRole' to store the role of the employee
//     const employee = await NewEmpModel.findOne({ gmail: email, Eid: managerId, jobRole: 'Employee Manager' });
//     if (employee) {
//       res.status(200).json({ authenticated: true });
//     } else {
//       res.status(401).json({ authenticated: false });
//     }
//   } catch (error) {
//     console.error("Error authenticating user:", error);
//     res.status(500).json({ authenticated: false, error: "Server error" });
//   }
// };
  