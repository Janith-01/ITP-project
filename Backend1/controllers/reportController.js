// backend/routes/reportRoutes.js
import express from 'express';
import pdfKit from 'pdfkit';
import fs from 'fs';
import UserModel from '../model/User.model.js';
import moment from 'moment'


// const router = express.Router();


export async function genarateReport(req, res) {

    try {
        const logUser = req.user;

        const users = await UserModel.find({}).sort({ timestamp: -1 }).limit(20);

        const tableData = [


        ];
        var index = 0;
        users.forEach(element => {
            index++;
            tableData.push({ id: index, name: element.firstName, email: element.email, phone: element.phone, userType: element.userType, registerDateAndTime: element.timestamp });
        });



        const doc = new pdfKit({ size: 'A4', layout: 'landscape' });
        await doc.pipe(fs.createWriteStream('report.pdf'));

        let nowTime = new Date();
        const datenow = moment(nowTime).format('YYYY-MM-DD hh:mm A');

        // Generate PDF content
        doc.fontSize(12).text('User Report ', 50, 100);
        doc.fontSize(10).text(`Genarated by ${logUser.username} at ${datenow}`, 150, 100);
        doc.moveDown();


        // Create table
        doc.font('Helvetica-Bold').text('ID', 50, 120);
        doc.text('Name', 70, 120);
        doc.text('Email', 180, 120);
        doc.text('Phone', 360, 120);
        doc.text('User Type', 450, 120);
        doc.text('Reg. Date', 530, 120);
        doc.font('Helvetica').moveDown();

        tableData.forEach((row, index) => {
            const { id, name, email, phone, userType, registerDateAndTime } = row;
            doc.text(`${id}`, 50, 140 + index * 20);
            doc.text(`${name}`, 70, 140 + index * 20);
            doc.text(`${email}`, 180, 140 + index * 20);
            doc.text(`${phone}`, 360, 140 + index * 20);
            doc.text(`${userType}`, 450, 140 + index * 20);
            const formattedDate = moment(registerDateAndTime).format('YYYY-MM-DD hh:mm A');
            doc.text(`${formattedDate}`, 530, 140 + index * 20);
        });

        doc.end();

        res.download('report.pdf'); // Send generated PDF to client

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Cannot genrate PDF" });
    }


}

// export default router;
