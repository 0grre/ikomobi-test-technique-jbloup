const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { Task } = require('../../models');

// Get all tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a task
router.post('/', auth, async (req, res) => {
    const { text } = req.body;

    try {
        const newTask = await Task.create({
            text,
            userId: req.user.id
        });

        res.json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
