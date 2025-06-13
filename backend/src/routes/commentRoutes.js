import express from 'express';
import commentDeletionCheckMiddleware from '../middlewares/commentDeletionCheckMiddleware.js';
import createCommentController from '../controllers/comment/createCommentController.js';
import deleteCommentController from '../controllers/comment/deleteCommentController.js';
import updateCommentController from '../controllers/comment/updateCommentController.js';

const router = express.Router();

//TODO: Create comment
router.post('/:postId/comment', createCommentController);
//TODO: Delete comment, autor do post ou autor do comentario
router.delete(
  '/delete/:commentId',
  commentDeletionCheckMiddleware,
  deleteCommentController,
);
//TODO: Update comment
router.put('/change/:commentId', updateCommentController);

export default router;
