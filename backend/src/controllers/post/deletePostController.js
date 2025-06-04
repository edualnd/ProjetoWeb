import { deletePost } from '../../model/postModel.js';

export default async function deletePostController(req, res) {
  try {
    const user = req.user.userId
    const { publicationId } = req.params;

    const result = await deletePost(user, +publicationId);

    return res.json({
      message: 'Post deletado com sucesso!',
      deletedPost: result,
    });
  } catch (error) {
    console.log('Erro ao deletar post:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
