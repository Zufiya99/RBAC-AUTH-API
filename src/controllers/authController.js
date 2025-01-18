import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/authModel.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({
      message: `User registered successfully with username ${username}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: `User with username ${username} not found`,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { registerUser, loginUser };
