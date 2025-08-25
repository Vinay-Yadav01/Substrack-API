import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const SubscriptionRouter = Router();

SubscriptionRouter.get("/", (req, res) => {
  res.send({ title: "Get all subscriptions" });
});

SubscriptionRouter.get("/:id", (req, res) => getUserSubscriptions);

SubscriptionRouter.post("/", authorize, createSubscription);

SubscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "Update subscription by ID" });
});

SubscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete subscription by ID" });
});

SubscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "Get all user subscriptions" });
});

SubscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel subscription by ID" });
});

SubscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "Get all upcoming renewals" });
});

export default SubscriptionRouter;
