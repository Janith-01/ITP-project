import DutySchedule from "../Model/DutySchedule.js";

// Controller functions for Duty Schedule
export const createDutySchedule = async (req, res) => {
  try {
    const newDutySchedule = await DutySchedule.create(req.body);
    res.status(201).json(newDutySchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDutySchedules = async (req, res) => {
  try {
    const dutySchedules = await DutySchedule.find();
    res.json(dutySchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDutyScheduleById = async (req, res) => {
  try {
    const dutySchedule = await DutySchedule.findById(req.params.id);
    if (dutySchedule) {
      res.json(dutySchedule);
    } else {
      res.status(404).json({ message: "Duty Schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDutySchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDutySchedule = await DutySchedule.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedDutySchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDutySchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await DutySchedule.findByIdAndDelete(id);
    res.json({ message: "Duty Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};