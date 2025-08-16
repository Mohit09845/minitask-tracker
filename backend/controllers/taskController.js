import prisma from '../config/prisma.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id, 
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};


export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id, 
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating task' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (status && status !== 'PENDING' && status !== 'DONE') {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found or you do not have permission to update it' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating task' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found or you do not have permission to delete it' });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting task' });
  }
};