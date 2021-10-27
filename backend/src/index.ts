import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import loadUser from "./middlewares/loadUser";
import measurementsRoutes from "./routes/measurements";
import usersRoutes from "./routes/users";

// Config
dotenv.config();
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/users/:userId/measurements", loadUser, measurementsRoutes);
app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to Lenus Weight Tracker API"));

// Connect DB and run
const mongoUri = process.env.DATABASE_URL || "";
console.log(`Trying to connect to DB : ${mongoUri}`);
mongoose.connect(mongoUri).then(() => {
  console.log(`Connected to DB`);
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
