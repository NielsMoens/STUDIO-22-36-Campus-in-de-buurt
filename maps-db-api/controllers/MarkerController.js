const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Marker } = require('../models/Marker');
const { MarkerLink } = require('../models/MarkerLink');
const isSuper = require('../utils/authorization');

class MarkerController {
        
    getCampusses = async(req, res, next) => {
        try {
            const markers = await Marker.find({published: true, type: "campus"}).exec();
            res.status(200).json(markers);
        } catch (e) {
            next(e);
        }
    }

    getOrganisations = async(req, res, next) => {
        try {
            const markers = await Marker.find({type: { $ne: "campus" }}).sort({
                name: 'desc'
            }).exec();
            res.status(200).json(markers);
        } catch (e) {
            next(e);
        }
    }

    getMarkerById = async(req, res, next) => {
        try {
            const {id} = req.params;
            const marker = await Marker.findById(id).exec();
            if(marker) {
                res.status(200).json(marker);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    updateMarkerById = async(req,res,next) => {
        try {
            const {id} = req.params;
            // find 
            const marker = await Marker.findById(id).exec();
            if(marker) {
                req = isSuper(req);
                marker.overwrite(req.body);
                const result = await marker.save();
                res.status(200).json(result);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }
    
    createMarker = async (req, res, next) => {
        try {
            req = isSuper(req);
            const marker = new Marker({
                ...req.body,
            });
            if(req.body.type === "campus") {
                delete req.body.campus;
            }
            const save = await marker.save();
            if(req.body.type !== "campus") {
                this.createMarkerLink(req, save, res, next);
            } else {
                res.status(200).json(save);
            }
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

    createMarkerLink = async(req, save, res, next) => {
        try {
            const markerLink = new MarkerLink({
                "campusId": req.body.campus,
                "organisationId": save.id
            });
            const result = await markerLink.save();
            res.status(200).json(result);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

    deleteMarkerById = async(req, res, next) => {
        try {
            const {id} = req.params;
            const marker = await Marker.findById(id).exec();
            if(marker) {
                marker.remove();
                res.status(200).json(marker);
            }  else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

}

module.exports = MarkerController;