const express = require('express');

const MovieController = require('../controllers/MovieController');
const ReviewController = require('../controllers/ReviewController');
const MarkerController = require('../controllers/MarkerController');
const RelatedMarkerController = require('../controllers/RelatedMarkerController');
const LikedMovieController = require('../controllers/LikedMovieController');
const UserController = require('../controllers/UserController');
const MarkerLinkController = require('../controllers/MarkerLinkController');
const { withRole } = require('../services/auth/auth.services');
const { roles } = require('../models/User');
const upload = require("../utils/multer");

const userController = new UserController();
const markerController = new MarkerController();
const relatedMarkerController = new RelatedMarkerController();
const markerLinkController = new MarkerLinkController();

const authRouter = express.Router();
const adminRouter = express.Router();

// markers
authRouter.get('/markers', markerController.getCampusses); // overview
authRouter.get('/markers/:id', markerController.getMarkerById); // detail
// authRouter.get('/directors/:id/movies', directorController.getMoviesByDirectorId); // detail
adminRouter.post('/markers', markerController.createMarker); // add
adminRouter.patch('/markers/:id', markerController.updateMarkerById); // update
// adminRouter.delete('/directors/:id', directorController.deleteDirectorById); // delete
// adminRouter.delete('/directors/:id/delete', directorController.deleteDirectorByIdAndMovies); // delete

// Related markers
authRouter.get('/markers/:id/relatedMarkers', relatedMarkerController.getRelatedByMarkerId); // overview
authRouter.post('/markers/:id/relatedMarkers', relatedMarkerController.createRelatedByMarkerId); // create relatedmarker

// markerlink
// authRouter.get('/markers/:campusId/:organisationId', markerLinkController.getRelatedByMarkerId); // overview
adminRouter.post('/markers/link', markerLinkController.createMarkerLink); // create relatedmarker

// organizations
authRouter.get('/organizations', markerController.getOrganisations); // overview
authRouter.get('/organizations/:id', markerController.getMarkerById); // overview
authRouter.post('/organizations/link/create', markerLinkController.createMarkerLink); // overview
authRouter.get('/organizations/link/:id', markerLinkController.getMarkerLinkById); // overview
authRouter.delete('/organizations/link/:id', markerLinkController.deleteMarkerLinkById); // overview


// Movies
// authRouter.get('/movies/paginate/:page/:perPage', movieController.getMoviesPaginated); // overview
// authRouter.get('/movies', movieController.getMovies); // overview
// authRouter.get('/movies/filter/:query', movieController.getMoviesByFilter); // detail
// authRouter.get('/movies/:id', movieController.getMovieById); // detail
// adminRouter.post('/movies', movieController.createMovie); // add
// adminRouter.patch('/movies/:id', movieController.updateMovieById); // update
// adminRouter.delete('/movies/:id', movieController.deleteMovieById); // delete

// // uploads
// adminRouter.post('/uploads', upload.single('file') ,movieController.uploadImage);

// // Reviews
// authRouter.get('/movies/:id/reviews/:page/:perPage', reviewController.getReviewsPaginated);
// authRouter.get('/movies/:id/reviews', reviewController.getReviewsByMovie);
// authRouter.post('/movies/:id/reviews', reviewController.createReviewByMovie);
// adminRouter.delete('/movies/reviews/:reviewid', reviewController.deleteReviewById);

// // likedMovies
// authRouter.get('/likedMovies', likedMovieController.getLikedMovies);
// authRouter.post('/likedMovies', likedMovieController.createLikedMovie);
// authRouter.delete('/likedMovies/:movieId', likedMovieController.deleteLikedMovieWithoutId);

// users
adminRouter.get('/users', userController.getUsers);
adminRouter.get('/users/filter/:query', userController.getUsersFiltered);
adminRouter.get('/users/paginate/:page/:perPage', userController.getUsersPaginated);
adminRouter.delete('/users/:id', userController.deleteUser);
adminRouter.patch('/users/:id', userController.updateUser);
authRouter.patch('/users', userController.updateSelf);
adminRouter.post('/users', userController.register);

authRouter.use(withRole(roles.admin), adminRouter);

module.exports = authRouter;