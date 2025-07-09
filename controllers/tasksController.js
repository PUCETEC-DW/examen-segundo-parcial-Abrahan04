import taskModel from '../models/taskModel.js';

class TasksController {
  getAllTasks(req, res) {
    res.json(taskModel.getAll());
  }

  createTask(req, res) {
    const { id, title, description, completed, priority } = req.body;
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
    try {
      const updated = taskModel.update(id, { completed });
      if (!updated) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  deleteTask(req, res) {
    const { id } = req.params;
    const deleted = taskModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  }

  getTaskSummary(req, res) {
    res.json(taskModel.getSummary());
  }
}

export default TasksController;