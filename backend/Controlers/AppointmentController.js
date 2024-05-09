const Appointment = require("../Model/AppointmentModel.js");

// Display all appointments
const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json({ appointments });
    } catch (err) {
        console.error("Error fetching appointments:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add a new appointment
const addAppointment = async (req, res, next) => {
    const {
        date,
        time,
        description,
        vehicleMake,
        vehicleModel,
        serviceType,
        customerName,
        customerEmail,
        customerPhone
    } = req.body;

    const newAppointment = new Appointment({
        date,
        time,
        description,
        vehicleMake,
        vehicleModel,
        serviceType,
        customerName,
        customerEmail,
        customerPhone
    });

    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json({ appointment: savedAppointment });
    } catch (err) {
        console.error("Error adding appointment:", err);
        res.status(500).json({ message: "Failed to add appointment" });
    }
};

// Get appointment by ID
const getAppointmentById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ appointment });
    } catch (err) {
        console.error("Error fetching appointment:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update an appointment
const updateAppointment = async (req, res, next) => {
    const id = req.params.id;
    const updateFields = req.body;

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true
        });
        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ appointment: updatedAppointment });
    } catch (err) {
        console.error("Error updating appointment:", err);
        res.status(500).json({ message: "Failed to update appointment" });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ appointment: deletedAppointment });
    } catch (err) {
        console.error("Error deleting appointment:", err);
        res.status(500).json({ message: "Failed to delete appointment" });
    }
};

module.exports = {
    getAllAppointments,
    addAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
