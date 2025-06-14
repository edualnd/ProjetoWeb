import { deleteComment } from '../../model/commentModel.js';

const deleteCommentController = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await deleteComment(+commentId);

    if (!deleteComment) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'Comentario deletado',
      deletedComment,
    });
  } catch (e) {
    next(e);
  }
};
export default deleteCommentController;
