const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { RelatedMarkers } = require('../models/RelatedMarkers');
const { Marker } = require('../models/Marker');
const { MarkerLink } = require('../models/MarkerLink');
const isSuper = require('../utils/authorization');


class MarkerLinkController {
    
    createMarkerLink = async(req, res, next) => {
        try {
            console.log(req.body);
            const markerLink = new MarkerLink({
                "campusId": req.body.campus,
                "organisationId": req.body.organisation
            });
            console.log(markerLink);
            const result = await markerLink.save();
            res.status(200).json(result);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
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

module.exports = MarkerLinkController;