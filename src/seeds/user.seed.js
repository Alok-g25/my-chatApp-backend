const User = require("../models/userModel.js")
const dbConnect = require("../utils/database.js")
require('dotenv').config();

const users = [
  {
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    password: "123456",
    phone: "9876543210",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Olivia Miller",
    email: "olivia.miller@example.com",
    password: "123456",
    phone: "8765432109",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    password: "123456",
    phone: "9123456780",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Ava Wilson",
    email: "ava.wilson@example.com",
    password: "123456",
    phone: "9988776655",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Isabella Brown",
    email: "isabella.brown@example.com",
    password: "123456",
    phone: "7890123456",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Mia Johnson",
    email: "mia.johnson@example.com",
    password: "123456",
    phone: "9012345678",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "Charlotte Williams",
    email: "charlotte.williams@example.com",
    password: "123456",
    phone: "9823456789",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "Amelia Garcia",
    email: "amelia.garcia@example.com",
    password: "123456",
    phone: "9345678901",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    name: "James Anderson",
    email: "james.anderson@example.com",
    password: "123456",
    phone: "7894561230",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "William Clark",
    email: "william.clark@example.com",
    password: "123456",
    phone: "9102030405",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Benjamin Taylor",
    email: "benjamin.taylor@example.com",
    password: "123456",
    phone: "9876012345",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Lucas Moore",
    email: "lucas.moore@example.com",
    password: "123456",
    phone: "9765432108",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Henry Jackson",
    email: "henry.jackson@example.com",
    password: "123456",
    phone: "9090909090",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Alexander Martin",
    email: "alexander.martin@example.com",
    password: "123456",
    phone: "9191919191",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Daniel Rodriguez",
    email: "daniel.rodriguez@example.com",
    password: "123456",
    phone: "9356789021",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await dbConnect();

    await User.insertMany(users);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
