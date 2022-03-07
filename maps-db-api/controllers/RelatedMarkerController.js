const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { RelatedMarkers } = require('../models/RelatedMarkers');

class RelatedMarkerController {
        
    getRelatedByMarker = async(req, res, next) => {
        try {
            const {id} = req.params;
            const related = await RelatedMarkers
                .find({markerId: id})
                .exec();
            if(related) {
                res.status(200).json(related);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }
    
    // getReviewsPaginated = async(req, res, next) => {
    //     try {
    //         const {id, page, perPage} = req.params;
    //         const pageAmount = await Review.find({movieId: id}).count().exec()
    //             .then((totalReviews) => {
    //                 return Math.ceil(totalReviews / perPage)
    //             });
    //         const reviews = await Review.find({movieId: id}).lean().populate('user', 'userName').limit(parseInt(perPage)).skip(perPage * page).sort({
    //             createdAt: 'desc'
    //         }).exec();
    //         res.status(200).json({pageAmount, reviews});
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    createRelatedByMarker = async (req, res, next) => {
        try {
            const {id} = req.params;
            const related = new RelatedMarkers({
                ...req.body,
                markerId: id,
            });
            const c = await related.save();
            res.status(200).json(c);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

    // deleteReviewById = async(req,res,next) => {
    //     try {
    //         const {reviewid} = req.params;
    //         const review = await Review.findById(reviewid).exec();
    //         if(review) {
    //             await review.remove();
    //             res.status(200).json(review);
    //         } else {
    //             next(new NotFoundError());
    //         }
    //     } catch(e) {
    //         next(e);
    //     }
    // }
    
}

module.exports = RelatedMarkerController;