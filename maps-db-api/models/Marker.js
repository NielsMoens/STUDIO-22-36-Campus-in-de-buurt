const mongoose = require('mongoose');

// schema
const markerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
        required: false,
    },
}, {
  timestamps: true,  
  toJSON: {
      virtuals: true,
  },
  toObject: {
      virtuals: true,
  }
});

const Marker = mongoose.model('Marker', markerSchema);

// model
module.exports = {
    Marker, markerSchema,
}