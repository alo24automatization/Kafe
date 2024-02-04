import mongoose from "mongoose";

const kafeSchema = new mongoose.Schema({
    kafe_nomi: { type: String, required: true },
    telefon_raqam: { type: String, required: true, unique: true }, // 998901234567
    direktor: { type: String, required: true },
    logo: { type: String, required: true },
    location: { type: String, required: true },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
    created_at: { type: Date, default: Date.now },
});

const Kafe = mongoose.model('kafe', kafeSchema);
export default Kafe
