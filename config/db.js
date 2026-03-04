const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = process.env.MONGO_URI;

        if (!db) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        throw err; // IMPORTANT for Vercel
    }
};

module.exports = connectDB;