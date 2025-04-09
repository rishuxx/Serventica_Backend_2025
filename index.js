const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const verifyToken = require("./api/middleware/verifyToken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// middleware
app.use(cors());
app.use(express.json());

//mongoDB Config using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@serventicawebsitedata20.srdolrj.mongodb.net/Serventica2025data?retryWrites=true&w=majority&appName=ServenticaWebsiteData2025`
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log(user)
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

//import routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const adminStats = require("./api/routes/adminStats");
const orderStats = require("./api/routes/orderStats");

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin-stats", adminStats);
app.use("/order-stats", orderStats);

// stripe payment gateway
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", verifyToken, (req, res) => {
  res.send("Hey Serventica Hope u will shine one day!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
