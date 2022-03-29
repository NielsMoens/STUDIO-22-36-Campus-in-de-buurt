const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { RelatedMarkers } = require('../models/RelatedMarkers');
const { Marker } = require('../models/Marker');
const { MarkerLink } = require('../models/MarkerLink');
const isSuper = require('../utils/authorization');


class MarkerLinkController {
    
    createMarkerLink = async(req, res, next) => {
        try {
            const markerLink = new MarkerLink({
                "campusId": req.body.campus,
                "organisationId": req.body.organisation
            });
            const result = await markerLink.save();
            res.status(200).json(result);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

    getMarkerLinkById = async(req, res, next) => {
        try {
            const {id} = req.params;
            const markerLink = await MarkerLink.find({organisationId: id}).lean().populate('campus', ['name']).exec();
            if(markerLink) {
                res.status(200).json(markerLink);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    deleteMarkerLinkById = async(req, res, next) => {
        try {
            const {id} = req.params;
            const markerLink = await MarkerLink.findById(id).exec();
            if(markerLink) {
                markerLink.remove();
                res.status(200).json(markerLink);
            }  else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }
    
}

module.exports = MarkerLinkController;