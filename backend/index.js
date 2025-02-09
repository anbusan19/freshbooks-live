const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 5000;

require("dotenv").config();

// middleware
app.use(express.json());

const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const bannerRoutes = require("./src/banners/banner.routes");

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/api/books", bookRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/auth", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/banners", bannerRoutes);
}

main()
  .then(() => console.log("Mongodb connect successfully!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
