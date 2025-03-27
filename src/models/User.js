// src/models/User.js
import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: v => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v),
      message: props => `${props.value} is not a valid URL!`
    }
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  description: {
    type: String,
    trim: true,
    maxlength: 300
  },
  image: {
    type: String,
    default: '/default-bookmark.png'
  },
  category: {
    type: String,
    enum: ['event', 'article', 'project', 'resource', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    maxlength: 20
  }],
  hostname: String,  // Extracted from URL for filtering
  isFavorite: {
    type: Boolean,
    default: false
  },
  visits: {
    type: Number,
    default: 0
  },
  lastVisited: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    required: true,
    validate: {
      validator: v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: props => `${props.value} is not a valid email!`
    }
  },
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  image: { 
    type: String,
    validate: {
      validator: v => /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)$/.test(v),
      message: props => `${props.value} is not a valid image URL!`
    }
  },
  provider: { 
    type: String, 
    required: true,
    enum: ['google', 'github', 'email']
  },
  providerId: { 
    type: String, 
    unique: true, 
    required: true
  },
  bookmarks: [bookmarkSchema],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    defaultView: {
      type: String,
      enum: ['grid', 'list'],
      default: 'grid'
    }
  },
  lastActive: Date
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster querying
userSchema.index({ 'bookmarks.url': 1 });
userSchema.index({ 'bookmarks.hostname': 1 });
userSchema.index({ 'bookmarks.category': 1 });
userSchema.index({ 'bookmarks.tags': 1 });

// Virtual property for bookmark count
userSchema.virtual('bookmarkCount').get(function() {
  return this.bookmarks.length;
});

// Pre-save hook to extract hostname
bookmarkSchema.pre('save', function(next) {
  if (this.isModified('url')) {
    try {
      this.hostname = new URL(this.url).hostname.replace(/^www\./, '');
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);