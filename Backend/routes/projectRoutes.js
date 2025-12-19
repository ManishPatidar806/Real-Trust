import express from 'express';
import { createProject, getAllProjects } from '../controllers/projectController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// POST /api/projects - Create a new project
router.post('/', upload.single('image'), createProject);

// GET /api/projects - Get all projects
router.get('/', getAllProjects);

export default router;
