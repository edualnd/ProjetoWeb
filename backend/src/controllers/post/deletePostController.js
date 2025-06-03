import { deletePost } from '../../model/postModel.js';

export default async function deletePostController(req, res) {
  try {
    const { authorId, publicationId } = req.params;

    const result = await deletePost(authorId, +publicationId);

    return res.json({
      message: 'Post deletado com sucesso!',
      deletedPost: result,
    });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return res.status(500).json({ error: 'Falha ao deletar post' });
  }
}
