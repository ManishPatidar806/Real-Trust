import express from 'express';
import { createClient, getAllClients } from '../controllers/clientController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// POST /api/clients - Create a new client
router.post('/', upload.single('image'), createClient);

// GET /api/clients - Get all clients
router.get('/', getAllClients);

export default router;
