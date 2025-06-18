import express from 'express';
import createRatingController from '../../controllers/rating/createRatingController.js';

const ratingRoutes = express.Router();

ratingRoutes.post('/:publicationId', createRatingController);

export default ratingRoutes;