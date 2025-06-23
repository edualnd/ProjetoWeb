import express from 'express';
import getEventSubController from '../controllers/eventSub/getEventSubController.js';
import createEventSubController from '../controllers/eventSub/createEventSubController.js';
import deleteEventSubsController from '../controllers/eventSub/deleteEventSubsController.js';
import listEventSubsController from '../controllers/eventSub/listEventSubsController.js';

const router = express.Router();

router.get('/', getEventSubController);
router.get('/list/:publicationId', listEventSubsController)
router.post('/:publicationId', createEventSubController);
router.delete('/:publicationId', deleteEventSubsController);

export default router;
