import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: [2, "User name must be at least 2 characters long"],
      maxLength: [50, "User name must be at most 50 characters long"],
    },

    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "User email must be a valid email address"],
    },

    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: [6, "User password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
