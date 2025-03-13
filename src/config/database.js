const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected to:", mongoose.connection.name);
    } catch (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
