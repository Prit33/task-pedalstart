const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};
app.use("/api/tasks", taskRoutes);


app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port: ${port}`);
});
