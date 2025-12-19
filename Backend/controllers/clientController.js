import Client from '../models/Client.js';
import cloudinary from '../config/cloudinary.js';

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'clients',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// Create a new client
export const createClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;

    // Validate required fields
    if (!name || !designation || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, designation, and description are required',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Create client
    const client = await Client.create({
      name,
      designation,
      description,
      image: result.secure_url,
    });

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client,
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating client',
      error: error.message,
    });
  }
};

// Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error.message,
    });
  }
};
