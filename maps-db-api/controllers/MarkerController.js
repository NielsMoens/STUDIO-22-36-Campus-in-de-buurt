const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Marker } = require('../models/Marker');
const isSuper = require('../utils/authorization');

class MarkerController {
        
    getMarkers = async(req, res, next) => {
        try {
            const markers = await Marker.find().exec();
            res.status(200).json(markers);
        } catch (e) {
            next(e);
        }
    }

    getMarkerById = async(req, res, next) => {
        try {

            console.log(req.params);
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

    // getMoviesByDirectorId = async(req, res, next) => {
    //     try {
    //         const {id} = req.params;
    //         const movies = await Movie.find({directorId: id}).exec();
    //         if(movies) {
    //             res.status(200).json(movies);
    //         } else {
    //             next(new NotFoundError());
    //         }
    //     } catch(e) {
    //         next(e);
    //     }
    // }

    // deleteDirectorById = async(req,res,next) => {
    //     try {
    //         const {id} = req.params;
    //         const director = await Director.findById(id).exec();
    //         if(director) {
    //             // cant use pre because off multiple delete possibilities
    //             await Movie.find({directorId: id}).exec()
    //             .then( async(res) => {
    //                 res.map( async(movie) => {
    //                     movie.directorId = null;
    //                     await movie.save();
    //                 })
    //             })
    //             .then(async () => await director.remove())
    //             res.status(200).json({director});
    //         } else {
    //             next(new NotFoundError());
    //         }
    //     } catch(e) {
    //         next(e);
    //     }
    // }

    // deleteDirectorByIdAndMovies = async(req,res,next) => {
    //     try {
    //         const {id} = req.params;
    //         const director = await Director.findById(id).exec();
    //         if(director) {
    //             // cant use pre because off multiple delete possibilities
    //             await Movie.find({directorId: id}).exec()
    //             .then( async(res) => {
    //                 res.map( async(movie) => {
    //                     await movie.remove()
    //                 })
    //             })
    //             .then(async () => await director.remove())
    //             res.status(200).json({director});
    //         } else {
    //             next(new NotFoundError());
    //         }
    //     } catch(e) {
    //         next(e);
    //     }
    // }

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
            const save = await marker.save();
            res.status(200).json(save);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

}

module.exports = MarkerController;