const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware
app.use(cors());
app.use(express.json());

// Apply test auth middleware only in test environment
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
