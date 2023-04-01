require('./config/db.js');
const express = require("express");
const app = express();
const cors = require("cors");

// Import Router
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/product", productRouter);

// Run Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});