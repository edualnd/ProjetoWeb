import express from 'express';
import followUserController from '../controllers/follow/followUserController.js';
import blockController from '../controllers/follow/blockController.js';
import countFollowingController from '../controllers/follow/countFollowingController.js';
import countFollowerController from '../controllers/follow/countFollowerController.js';
import listFollowerController from '../controllers/follow/listFollowerController.js';
import listFollowingController from '../controllers/follow/listFollowingController.js';
import stopFollowController from '../controllers/follow/stopFollowController.js';

const router = express.Router();

router.post('/follow-user', followUserController);
router.delete('/block', blockController);
router.delete('/stop-follow', stopFollowController);
router.get('/list/follower', listFollowerController);
router.get('/list/following', listFollowingController);
router.get('/count/follower', countFollowerController);
router.get('/count/follower', countFollowingController);

export default router;
