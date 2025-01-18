import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `Database connected: 
      Host - ${connect.connection.host}, 
      Name - ${connect.connection.name}`
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
};

export default dbConnect;
