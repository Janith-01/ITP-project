import EmployeeAdd from "../Model/employeeadd.js";

// Controller function for creating employee with file upload
export const createEmployee = async (req, res) => {
  try {
    const { name, Eid, gender, age, phone, Email } = req.body;
    const Ps = req.file.filename;
    const newEmployee = await EmployeeAdd.create({ name, Eid, gender, age, phone, Email, Ps });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeAdd.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await EmployeeAdd.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await EmployeeAdd.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeAdd.findByIdAndDelete(id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};