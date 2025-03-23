// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  image: { type: String },
  provider: { type: String, required: true }, // e.g., 'google', 'github'
  providerId: { type: String, unique: true, required: true }, // Unique ID from the provider
});

export default mongoose.models.User || mongoose.model('User', userSchema);