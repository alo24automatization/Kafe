import mongoose from "mongoose";

const ofisiantSchema = new mongoose.Schema({
    username: { type: String, required: true },
    kafe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'kafe', required: true },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', required: true }
})

const Ofisiant = mongoose.model('ofisiant', ofisiantSchema);
export default Ofisiant
