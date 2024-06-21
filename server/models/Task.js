const mongoose = require("mongoose");

//Schema for task
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
