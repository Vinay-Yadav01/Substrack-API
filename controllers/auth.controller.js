import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  // Sign up logic
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Logic for signing up a user
    // e.g., creating a new user document in the database

    console.log("Sign up request received:");

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  } finally {
    session.endSession();
  }
};

export const signIn = async (req, res, next) => {
  // Sign in logic
  res.status(200).json({
    success: true,
    message: "User signed in successfully",
    data: {
      token: "dummy_token",
      user: {
        id: "dummy_user_id",
        name: "Dummy User",
        email: "dummy@example.com",
      },
    },
  });
};

export const signOut = async (req, res, next) => {
  // Sign out logic
};
