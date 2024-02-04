import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    kafe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'kafe', required: true }
})

const Menu = mongoose.model('menu', menuSchema);
export default Menu
