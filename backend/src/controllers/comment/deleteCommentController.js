import { deleteComment } from "../../model/commentModel.js";

const deleteCommentController = async (req, res) =>{
  const commentId = req.params.commentId;

  const deletedComment = await deleteComment(+commentId);

  if(!deleteComment){
    return res.status(404).json({ message: "Erro ao deletar" });
  }

  return res.status(200).json({
    message: "Comentario deletado"
  })
}
export default deleteCommentController;