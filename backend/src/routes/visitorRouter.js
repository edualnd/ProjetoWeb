import express from 'express';

import profileController from '../controllers/user/profileController.js';

import loginController from '../controllers/user/auth/loginController.js';
import registerController from '../controllers/user/auth/registerController.js';
import forgotPasswordController from '../controllers/user/auth/forgotPasswordController.js';
import resetPasswordController from '../controllers/user/auth/resetPasswordController.js';
import checkForgotPassTokenMiddleware from '../middlewares/checkForgotPassTokenMiddleware.js';
import refreshTokenController from '../controllers/auth/refreshTokenController.js';
import getCommentsController from '../controllers/comment/getCommentsController.js';

import getAllPostsVisitorController from '../controllers/post/getAllPostsVisitorController.js';
import getEventController, {
  getCloserEventController,
} from '../controllers/event/getEventController.js';
import getRatingStatisticsController from '../controllers/rating/getRatingStatisticsController.js';
import listFollowerController from '../controllers/follow/listFollowerController.js';
import listFollowingController from '../controllers/follow/listFollowingController.js';

const router = express.Router();

router.post('/refresh', refreshTokenController);

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/profile/:username', profileController);

router.post('/forgot-password', forgotPasswordController);
router.post(
  '/reset-password/:token',
  checkForgotPassTokenMiddleware,
  resetPasswordController,
);
router.get('/', (req, res, next) => {
  return res.status(200).json({ success: true });
});

//TODO: Visualizar posts
router.get('/posts', getAllPostsVisitorController);

router.get('/list', getEventController);
router.get('/newer-event', getCloserEventController);
//TODO: Visualizar seguidores e seguindo
router.get('/list/follower/:username', listFollowerController);
router.get('/list/following/:username', listFollowingController);
//TODO: Visualizar comentarios

router.get('/:postId/comments', getCommentsController);

//router.get('/ratings', getAllRatingsController);
router.get('/ratings/:publicationId', getRatingStatisticsController);

export default router;
