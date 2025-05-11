const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    image: {
        type: String,
        default: "", // can be a URL or path
    },
}, {
    timestamps: true, // adds createdAt and updatedAt
});

const User = mongoose.model("User", userSchema);

module.exports = User;
