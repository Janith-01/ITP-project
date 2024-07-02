import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/connection.js";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";
import router from "./router/route.js";
import userRouter from "./router/userRoutes.js";
import feedbackRouter from "./router/feedbackRoutes.js";
import reportRouter from "./router/reportRoutes.js";
import reqOrderRoutes from "./router/reqOrderRoutes.js";
import supRoutes from "./router/supRoutes.js";
import vehicleRouter from "./router/VehicleRoutes.js";
import serviceHistoryRouter from "./router/ServiceHistoryRoutes.js";
import leaveRequestRouter from "./router/LeaveRequestRoutes.js";
import attendRoutes from "./router/AttendRoutes.js";
import dutySchedule from "./router/dutySchedule.js";
import SalaryAdd from "./router/SalaryRoutes.js";
import employeeRoutes from "./router/EmployeeRoutes.js";
import NewEmpRoutes from "./router/NewEmpRoutes.js";
import pdfRoutes from "./router/PdfRoutes.js";
import pdfSchema from "./Model/pdfModel.js";
import AppointmentRoutes from "./router/AppointmentRoutes.js";
import router5 from "./router/transaction.js";
import router4 from "./router/totalExpenseRoutes.js";
import router3 from "./router/totalAmountRoutes.js";
import salesRoute from "./router/salesRoute.js";
import router6 from "./controllers/balanceController.js";
import route from "./router/stockRoute.js";

// environment variables
dotenv.config();

// connect database
connectDB();

// Express App
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powerd-by");


//Handle authentication
app.post("/authenticate", async (req, res) => {
  const { email, managerId } = req.body;

  try {
    const employee = await User2.findOne({ gmail: email, Eid: managerId, jobRole: "Employee Manager" });

    if (employee) {
      res.json({ authenticated: true, navigateToManagerView: true });
    } else {
      res.json({ authenticated: false });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "An error occurred while authenticating" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer upload
const upload = multer({ storage });

// Handle file upload
app.post("/uplodefile", upload.single("file"), async (req, res) => {
  const title = req.body.title;
  const pdf = req.file.filename;

  try {
    await pdfSchema.create({ title: title, pdf: pdf });
    console.log("pdf Uploaded Successfully");
    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

// Get list of uploaded files
app.get("/getFile", async (req, res) => {
  try {
    const data = await pdfSchema.find({});
    res.send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

// Insert Model
import "./Model/employeeadd.js";

// Handle file upload
app.post("/Employeeadd", upload.single("Ps"), async (req, res) => {
  const { name, Eid, gender, age, phone, Email } = req.body;
  const Ps = req.file.filename;

  try {
    const Employee = mongoose.model("employeeadd");
    await Employee.create({ name, Eid, gender, age, phone, Email, Ps });
    console.log("Employee added successfully");
    res.status(200).send({ status: "success" });
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).send({ status: "error", message: err.message });
  }
});

//New Employee Function
import "./Model/NewEmpModel.js";
import notificationRoutes from "./router/notificationRoutes.js";

const User2 = mongoose.model("NewEmployee");
app.post("/NewEmp", async (req, res) => {
  const { name, gmail, jobRole, Eid } = req.body;
  try {
    await User2.create({
      name,
      gmail,
      jobRole,
      Eid,
    });
    res.send({ status: "ok" });
  } catch (err) {
    console.error("Error creating new employee:", err);
    res.send({ status: "err" });
  }
});


const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});


app.use("/api", router);
app.use("/api/user", userRouter);
app.use("/api/job", feedbackRouter);
app.use("/api/report", reportRouter);

app.use("/", supRoutes); 


app.use("/vehicles", vehicleRouter);
app.use("/serviceshistory", serviceHistoryRouter);


app.use("/leaverequest", leaveRequestRouter);
app.use("/attend", attendRoutes);
app.use("/schedule", dutySchedule);
app.use("/salaryAdd", SalaryAdd);
app.use("/Employeeadd", employeeRoutes);
app.use("/NewEmp", NewEmpRoutes);
app.use("/", pdfRoutes);


app.use("/users",AppointmentRoutes);
app.use("/api/appointments", AppointmentRoutes);

app.use("/api/transactions", router5);//extraexpense route
app.use(router3);  //total income route
app.use(router4); //total expense route
app.use(router6); //total balance route

app.use(salesRoute);
app.use("/api", route);
app.use("/notification", notificationRoutes);
app.use("/reqorder", reqOrderRoutes);
app.listen(port, () => {
  console.log(`Server connected to Port - http://localhost:${port}`);
});
