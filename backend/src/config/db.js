



// "mongodb+srv://s10630818_db_user:cVKjmT5pTQrW9GfM@cluster0.cs7gbiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect( process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };

