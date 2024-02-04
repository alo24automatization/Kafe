import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()

export const connectDB = async (app) => {
    try {
        const PORT = process.env.PORT
        const DB = process.env.DB
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect to MongoDB');
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (error) {
        console.log('Serverda xatolik yuz berdi', error.message);
        process.exit(1);
    }
};
