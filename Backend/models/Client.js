import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, 'Client designation is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Client description is required'],
  },
  image: {
    type: String,
    required: [true, 'Client image is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
