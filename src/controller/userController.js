const generateToken = require("../middleware/jsonWebToken");
const User = require("../models/userModel")
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(409).json({ status: 409, success: false, message: "Email or phone already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await user.save();
    // Exclude password from response
    const { password: _, ...userData } = user.toObject();
    generateToken(userData._id, res);
    res.status(201).json({
      status: 201, success: true,
      message: "Account created successfully",
      user: userData,
    });

  } catch (error) {
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ status: 400, success: false, message: messages.join(", ") });
    }
    console.error("Signup error:", error);
    res.status(500).json({ status: 500, success: false, message: "Server error" });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      success: true,
      message: "user Login successfully",
      user
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ success: false, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const checkAuth = async (req, res) => {
  try {
    const myId = req?.user?._id

    const user = await User.findById(myId)
    if (!user) {
      return res.status(404).json({ success: false, message: "user not Found" });
    }

    res.status(200).json({ success: true, user: user });

  } catch (error) {
    console.log("Error in auth check controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const myId = req?.user?._id

    const users = await User.find({ _id: { $ne: myId } }).select("-password")
    if (!users) {
      return res.status(404).json({ success: false, message: "users not Found" });
    }

    res.status(200).json({ success: true, users });

  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const profileUpdate = async (req, res) => {
  try {
    const myId = req?.user?._id;
    const { name } = req.body;

    const user = await User.findById(myId)
    // console.log(user,"******************88");
    if (!user) {
      return res.status(404).json({ success: false, message: "user not Found" });
    }

    // Check if file is uploaded
    // console.log(req)
    if (req.file) {
      user.image = `${process.env.SERVER_RUN}/uploads/profiles/${req.file.filename}`; // Save path to DB
    }
    if (name) user.name = name;

    await user.save();
    // console.log(user,"*************")
    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.log("Error in profileUpdate controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { signup, login, logout, checkAuth, getAllUsers, profileUpdate };


