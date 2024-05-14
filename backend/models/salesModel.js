import mongoose from 'mongoose';

// Define the schema after importing mongoose
const saleSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  dateSold: {
    type: Date,
    required: true,
  },
  totalSales: {
    type: Number, // Adding it as a standard field
  },
});

// Export the mongoose model
export default mongoose.model('Sale', saleSchema);