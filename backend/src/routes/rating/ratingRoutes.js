import express from 'express';
import createRatingController from '../../controllers/rating/createRatingController.js';
import updateRatingController from '../../controllers/rating/updateRatingController.js';
import deleteRatingController from '../../controllers/rating/deleteRatingController.js';
import getRatingStatisticsController from '../../controllers/rating/getRatingStatisticsController.js';

const ratingRoutes = express.Router();

ratingRoutes.get('/:publicationId', getRatingStatisticsController);
ratingRoutes.post('/:publicationId', createRatingController);
ratingRoutes.put('/:publicationId', updateRatingController);
ratingRoutes.delete('/:publicationId', deleteRatingController);
export default ratingRoutes;