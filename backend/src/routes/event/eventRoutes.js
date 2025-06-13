import express from 'express';
import createEventController from '../../controllers/event/createEvent.js';

const eventRoutes = express.Router();

eventRoutes.post('/', createEventController);
export default eventRoutes;
