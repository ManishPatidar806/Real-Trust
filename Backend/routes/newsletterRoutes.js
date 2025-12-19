import express from 'express';
import { createNewsletterSubscription, getAllNewsletterSubscribers } from '../controllers/newsletterController.js';

const router = express.Router();

// POST /api/newsletter - Create a new newsletter subscription
router.post('/', createNewsletterSubscription);

// GET /api/newsletter - Get all newsletter subscribers
router.get('/', getAllNewsletterSubscribers);

export default router;
