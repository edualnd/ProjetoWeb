import { getComment } from '../model/commentModel.js';

const commentDeletionCheckMiddleware = async (req, res, next) => {
  const commentId = req.params.commentId;

  const comment = await getComment(+commentId);
  if (!comment) {
    return res.status(404).json({
      message: 'Comentario não achado',
    });
  }
  const {
    authorId,
    Publication: { authorId: postAuthor },
  } = comment;

  const userId = req.user.userId;
  if (authorId != userId && postAuthor != userId) {
    return res.status(404).json({
      message: 'Apagar esse comentario',
    });
  }
  next();
};
export default commentDeletionCheckMiddleware;
