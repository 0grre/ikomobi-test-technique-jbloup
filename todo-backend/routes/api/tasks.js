const express = require('express');
const router = express.Router();
const { Task } = require('../../models');
const auth = require('../../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { text } = req.body;

    if (!text || text.length > 50) {
        return res.status(400).json({ msg: 'Task must be between 1 and 50 characters' });
    }

    try {
        const newTask = await Task.create({ text, userId: req.user.id });
        res.json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        await task.destroy();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
