import mongoose from 'mongoose';

const { Schema } = mongoose;

const servicehistorySchema = new Schema({
    vin: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    parts: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        default: 'vehicle service',
    },
    cost: {
        type: Number,
        required: true,
    },
    macanic: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('ServiceHistoryModel', servicehistorySchema);
