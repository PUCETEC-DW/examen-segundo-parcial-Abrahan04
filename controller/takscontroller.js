const taskModel = require('../models/taskModel');

class TasksController {
    getAllTasks(req, res) {
        res.json(taskModel.getAll());
    }

    createTask(req, res) {
        const { id, title, description, completed, priority } = req.body;
        if (!id || !title || !description || typeof completed !== 'boolean' || typeof priority !== 'number') {
            return res.status(400).json({ error: 'Datos incompletos o inválidos' });
        }
        if (priority < 1 || priority > 5) {
            return res.status(400).json({ error: 'La prioridad debe estar entre 1 y 5' });
        }
        try {
            const task = taskModel.add({ id, title, description, completed, priority });
            res.status(201).json(task);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    updateTask(req, res) {
        const { id } = req.params;
        const { completed } = req.body;
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'El campo completed debe ser booleano' });
        }
        const updated = taskModel.update(id, { completed });
        if (!updated) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(updated);
    }

    deleteTask(req, res) {
        const { id } = req.params;
        const deleted = taskModel.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(204).send();
    }

    getTasksSummary(req, res) {
        res.json(taskModel.getSummary());
    }
}

module.exports = TasksController;