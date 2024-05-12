import express from 'express';
import cors from 'cors';
import { connectDB } from './Database/db.js';
import router from "./routes/transaction.js";
import router2 from "./routes/ServiceHistoryRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router3 from './routes/totalAmountRoutes.js';
import SalaryAdd from "./routes/SalaryRoutes.js";
import router4 from './routes/totalExpenseRoutes.js';
import router5 from './controllers/balanceController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/transactions', router);//extra expense route
app.use('/api/servicehistory', router2);
app.use('/api/Sale', salesRoutes);
app.use(router3);//Total Income Route
app.use("/salaryAdd", SalaryAdd);
app.use(router4);//Total Expense Route
app.use(router5);//Total Balance Route

// Root route
app.get('/', (req, res) => {
    res.send('Server is working!');
});

// Start the server
const server = () => {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

server();
