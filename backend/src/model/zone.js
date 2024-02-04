import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
    title: { type: String, required: true },
    kafe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'kafe', required: true },
})

const Zone = mongoose.model('zone', zoneSchema);
export default Zone
