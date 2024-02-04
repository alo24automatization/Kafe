import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    auth_login: { type: String, required: true, unique: true, },
    auth_password: { type: String, required: true },
    status: {
        type: String,
        enum: ['superAdmin', 'kafeAdmin', 'ofisiant'],
        default: 'ofisiant',
    },
})

const Auth = mongoose.model('auth', authSchema);
export default Auth
