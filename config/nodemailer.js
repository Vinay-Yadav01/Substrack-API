import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const accountEmail = "vinayadav.2247@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vinayadav.2247@gmail.com",
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;
