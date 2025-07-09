import express from 'express';
import TasksController from '../controllers/tasksController.js';

const router = express.Router();
const tasksController = new TasksController();

router.get('/summary', tasksController.getTaskSummary.bind(tasksController));
router.get('/', tasksController.getAllTasks.bind(tasksController));
router.post('/', tasksController.createTask.bind(tasksController));
router.put('/:id', tasksController.updateTask.bind(tasksController));
router.delete('/:id', tasksController.deleteTask.bind(tasksController));

export default router;