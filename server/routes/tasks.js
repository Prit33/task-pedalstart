const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Retrieve all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Create a new task
router.post('/', async (req, res) => {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({ title, description, dueDate });
    await newTask.save();
    res.json(newTask);
});

// Retrieve a single task by ID
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

// Update an existing task
router.put('/:id', async (req, res) => {
    const { title, description, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate }, { new: true });
    res.json(updatedTask);
});

// Delete a task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
