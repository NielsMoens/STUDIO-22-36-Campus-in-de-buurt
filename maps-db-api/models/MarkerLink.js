const mongoose = require('mongoose');

// schema
const markerLinkSchema = new mongoose.Schema({
    campusId: {
        type: 'ObjectId',
        required: true,
    },
    organisationId: {
        type: 'ObjectId',
        required: true,
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

markerLinkSchema.virtual('organisation', {
    ref:'Marker',
    localField: 'organisationId',
    foreignField: '_id',
    justOne: true,
});

const MarkerLink = mongoose.model('MarkerLink', markerLinkSchema);

// model
module.exports = {
    MarkerLink, markerLinkSchema,
}