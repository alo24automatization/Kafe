import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'menu', required: true }
})

const Product = mongoose.model('product', productSchema);
export default Product
