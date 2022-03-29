const mongoose = require('mongoose');
const { MarkerLink } = require('./MarkerLink');

const types = {
    campus: "campus",
    organisation: "organisation",
    company: "company",
    other: "other",
}

// schema
const markerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: [types.campus, types.organisation, types.company, types.other],
        default: types.campus,
    },
    imageLink: {
        type: String,
        required: false,
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

// everytime a organisation gets removed
markerSchema.pre(['remove', 'deleteMany'] , function() {
    const marker = this;
    return MarkerLink.remove({organisationId: marker._id});
});

const Marker = mongoose.model('Marker', markerSchema);

// model
module.exports = {
    Marker, markerSchema,
}