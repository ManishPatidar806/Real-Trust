import ContactForm from '../models/ContactForm.js';

// Create a new contact form submission
export const createContactForm = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    // Validate required fields
    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Create contact form entry
    const contactForm = await ContactForm.create({
      fullName,
      email,
      mobile,
      city,
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contactForm,
    });
  } catch (error) {
    console.error('Error creating contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message,
    });
  }
};

// Get all contact form submissions
export const getAllContactForms = async (req, res) => {
  try {
    const contactForms = await ContactForm.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contactForms.length,
      data: contactForms,
    });
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact forms',
      error: error.message,
    });
  }
};
