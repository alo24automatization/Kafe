import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    stol_id: { type: mongoose.Schema.Types.ObjectId, ref: 'stol', required: true },
    count: { type: Number, required: true, default: 0 },
})

const Order = mongoose.model('order', orderSchema);
export default Order
