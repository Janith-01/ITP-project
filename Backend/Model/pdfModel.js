import mongoose from "mongoose";

const { Schema, model } = mongoose;

const pdfSchema = new Schema ({
    pdf: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }, 
});

export default model("PdfDetails", pdfSchema);