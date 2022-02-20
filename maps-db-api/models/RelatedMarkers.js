const mongoose = require('mongoose');

// schema
const relatedMarkersSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    markerId: {
        type: 'ObjectId',
        default: null,
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

relatedMarkersSchema.virtual('marker', {
    ref:'Marker',
    localField: 'markerId',
    foreignField: '_id',
    justOne: true,
});

// everytime a movie gets removed
// movieSchema.pre(['remove', 'deleteMany'] , function() {
//     const movie = this;
//     return Review.remove({movieId: movie._id});
// });

// movieSchema.pre(['remove', 'deleteMany'] , function() {
//     const movie = this;
//     return LikedMovie.remove({movieId: movie._id});
// });

const RelatedMarkers = mongoose.model('RelatedMarkers', relatedMarkersSchema);

// model
module.exports = {
    RelatedMarkers, relatedMarkersSchema,
}