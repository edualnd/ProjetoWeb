import express from 'express';
import createEventController from '../../controllers/event/createEvent.js';
import deleteEventController from '../../controllers/event/deleteEvent.js';
import getEventController from '../../controllers/event/getEventController.js';
import updateEventController from '../../controllers/event/updateEventController.js';

const eventRoutes = express.Router();

eventRoutes.get('/list', getEventController);
eventRoutes.post('/', createEventController);
eventRoutes.put('/:publicationId', updateEventController);
eventRoutes.delete('/:publicationId', deleteEventController);
export default eventRoutes;
