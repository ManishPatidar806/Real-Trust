import express from 'express';
import { createContactForm, getAllContactForms } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Create a new contact form submission
router.post('/', createContactForm);

// GET /api/contact - Get all contact form submissions
router.get('/', getAllContactForms);

export default router;
