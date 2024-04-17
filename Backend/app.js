const express = require('express');
const cors = require('cors');
const { connectDB } = require('./Database/db');
const {readdirSync} = require('fs')
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route) => app.use('/api/transactions', require('./routes/' + route)))

app.get('/', (req, res) => {
    res.send('Server is working !');
})


const server = () => {
     connectDB()
     app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
})
};

server()