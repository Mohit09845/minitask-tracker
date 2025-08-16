import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', protectRoute, getTasks);
router.post('/', protectRoute, createTask);
router.put('/:id', protectRoute, updateTask);
router.delete('/:id', protectRoute, deleteTask);

export default router;