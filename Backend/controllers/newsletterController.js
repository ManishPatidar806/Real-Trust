import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

// Create a new newsletter subscription
export const createNewsletterSubscription = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: 'Email already subscribed',
      });
    }

    // Create newsletter subscription
    const subscriber = await NewsletterSubscriber.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber,
    });
  } catch (error) {
    console.error('Error creating newsletter subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter',
      error: error.message,
    });
  }
};

// Get all newsletter subscribers
export const getAllNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching newsletter subscribers',
      error: error.message,
    });
  }
};
