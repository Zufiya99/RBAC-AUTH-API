import express, { json } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

// Load environment variables
dotenv.config();

const app = express();
dbConnect();

// Middleware
app.use(json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
