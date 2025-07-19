require('dotenv').config(); // ✅ Load environment variables
const mongoose = require('mongoose');
const User = require('./models/User');

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    await User.insertMany([
      { name: "Kamal", totalPoints: 0 },
      { name: "Kanak", totalPoints: 0 },
      { name: "Charlie", totalPoints: 0 },
    ]);

    console.log("✅ Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seedUsers();

