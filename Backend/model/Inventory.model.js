import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  itemId: {
    type: String, 
    required: true,
    unique: true 
  },
  supplierName: {
    type: String,
    required: true
  },
  orderTitle: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
