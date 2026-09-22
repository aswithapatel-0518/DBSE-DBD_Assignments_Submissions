const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================

app.use("/students", studentRoutes);

// ===============================
// MONGODB ATLAS CONNECTION
// ===============================

const MONGO_URI =
  "mongodb://aswithapatel_db_user:MONGODB@ac-j5tly2k-shard-00-00.tamxwm1.mongodb.net:27017,ac-j5tly2k-shard-00-01.tamxwm1.mongodb.net:27017,ac-j5tly2k-shard-00-02.tamxwm1.mongodb.net:27017/?ssl=true&replicaSet=atlas-onl9m7-shard-0&authSource=admin&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });