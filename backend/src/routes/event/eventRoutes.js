import express from 'express';
import createEventController from '../../controllers/event/createEvent.js';
import deleteEventController from '../../controllers/event/deleteEvent.js';
import getEventController, {
  getCloserEventController,
} from '../../controllers/event/getEventController.js';
import updateEventController from '../../controllers/event/updateEventController.js';
import upload from '../../utils/multer/config.js';

const eventRoutes = express.Router();

eventRoutes.get('/list', getEventController);
eventRoutes.get('/newer-event', getCloserEventController);
eventRoutes.post('/', upload.array('photos', 2), createEventController);
eventRoutes.put(
  '/:publicationId',
  upload.array('photos', 2),
  updateEventController,
);
eventRoutes.delete('/:publicationId', deleteEventController);
export default eventRoutes;
