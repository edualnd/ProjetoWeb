import express from 'express';
import followUserController from '../controllers/follow/followUserController.js';
import blockController from '../controllers/follow/blockController.js';

import stopFollowController from '../controllers/follow/stopFollowController.js';

const router = express.Router();

router.post('/follow-user', followUserController);
router.delete('/block', blockController);
router.delete('/stop-follow', stopFollowController);


export default router;
