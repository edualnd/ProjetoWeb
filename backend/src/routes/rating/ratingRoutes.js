import express from 'express';
import createRatingController from '../../controllers/rating/createRatingController.js';
import updateRatingController from '../../controllers/rating/updateRatingController.js';
import deleteRatingController from '../../controllers/rating/deleteRatingController.js';
const ratingRoutes = express.Router();

ratingRoutes.post('/:publicationId', createRatingController);
ratingRoutes.put('/:publicationId', updateRatingController);
ratingRoutes.delete('/:publicationId', deleteRatingController);
export default ratingRoutes;