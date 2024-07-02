import express from "express";
import PdfModel from "../Model/pdfModel.js";

const router = express.Router();

// Delete a PDF by ID
router.delete("/deletePdf/:pdfId", async (req, res) => {
  const pdfId = req.params.pdfId;

  try {
    // Check if the PDF exists
    const pdf = await PdfModel.findById(pdfId);
    if (!pdf) {
      return res.status(404).send({ status: "error", message: "PDF not found" });
    }

    // Delete the PDF
    await pdf.deleteOne();
    res.send({ status: 200, message: "PDF deleted successfully" });
  } catch (err) {
    console.error("Error deleting PDF:", err);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

export default router;