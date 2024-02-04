import mongoose from "mongoose";

const stolSchema = new mongoose.Schema({
    stol_nomi: { type: String, required: true },
    QR: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    code: { type: Number, required: false },
    kafe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'kafe', required: true },
    zone_id: { type: mongoose.Schema.Types.ObjectId, ref: 'zone', required: true },
    xizmat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ofisiant', required: false },
    ofisiant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ofisiant', required: false }
})

const Stol = mongoose.model('stol', stolSchema);
export default Stol
