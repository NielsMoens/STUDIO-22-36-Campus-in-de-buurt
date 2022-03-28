const express = require('express');

const MarkerController = require('../controllers/MarkerController');
const RelatedMarkerController = require('../controllers/RelatedMarkerController');
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
adminRouter.post('/markers', markerController.createMarker); // add
adminRouter.patch('/markers/:id', markerController.updateMarkerById); // update

// Related markers
authRouter.get('/markers/:id/relatedMarkers', relatedMarkerController.getRelatedByMarkerId); // overview
authRouter.post('/markers/:id/relatedMarkers', relatedMarkerController.createRelatedByMarkerId); // create relatedmarker

// markerlink
adminRouter.post('/markers/link', markerLinkController.createMarkerLink); // create relatedmarker

// organizations
authRouter.get('/organizations', markerController.getOrganisations); // overview
authRouter.get('/organizations/:id', markerController.getMarkerById); // overview
authRouter.post('/organizations/link/create', markerLinkController.createMarkerLink); // overview
authRouter.get('/organizations/link/:id', markerLinkController.getMarkerLinkById); // overview
authRouter.delete('/organizations/link/:id', markerLinkController.deleteMarkerLinkById); // overview

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