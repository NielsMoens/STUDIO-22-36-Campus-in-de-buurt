const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { MarkerLink } = require('../models/MarkerLink');
const { RelatedMarkers } = require('../models/RelatedMarkers');

class RelatedMarkerController {
        
    getRelatedByMarkerId = async(req, res, next) => {
        try {
            const {id} = req.params;
            const related = await MarkerLink
                .find({campusId: id})
                .lean()
                .populate('organisation')
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

    createRelatedByMarkerId = async (req, res, next) => {
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
    
}

module.exports = RelatedMarkerController;