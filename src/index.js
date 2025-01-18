import express, { json } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";

// Load environment variables
dotenv.config();

const app = express();
dbConnect();

// Middleware
app.use(json());

// Routes

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
