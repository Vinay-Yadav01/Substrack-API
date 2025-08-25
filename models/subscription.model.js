import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: [2, "Subscription name must be at least 2 characters long"],
      maxLength: [100, "Subscription name must be at most 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be positive"],
    },
    currency: {
      type: String,
      required: [true, "Subscription currency is required"],
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
      enum: ["basic", "standard", "premium"],
      default: "basic",
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["UPI", "credit_card", "bank_transfer"],
      default: "credit_card",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "paused"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value) {
          return value < this.renewalDate;
        },
        message: "Start date must be before renewal date",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriod[this.frequency]
    );
  }

  console.log(this.renewalDate);

  if (this.renewalDate < Date.now()) {
    this.status = "inactive";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;

// {
//   "name": "YouTube Premium",
//   "price": 9.99,
//   "currency": "INR",
//   "frequency": "monthly",
//   "category": "premium",
//   "paymentMethod": "credit_card",
//   "startDate": "2023-01-01",
//   "renewalDate": "2024-01-01"
// }
