import { getComment } from '../model/commentModel.js';
import CustomError from '../errors/CustomErrors.js';
const commentDeletionCheckMiddleware = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;

    const comment = await getComment(+commentId);
    if (!comment) {
      throw new CustomError(404, 'Comentário não encontrado');
    }
    const {
      authorId,
      Publication: { authorId: postAuthor },
    } = comment;

    const userId = req.user.userId;
    if (authorId != userId && postAuthor != userId) {
      throw new CustomError(401, 'Você não pode deletar esse comentário');
    }
    next();
  } catch (e) {
    next(e);
  }
};
export default commentDeletionCheckMiddleware;
