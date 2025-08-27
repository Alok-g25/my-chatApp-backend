const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
        });
        console.log("Database is connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

module.exports = dbConnect;
