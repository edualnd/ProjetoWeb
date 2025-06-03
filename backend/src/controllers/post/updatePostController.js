import { update } from '../../model/postModel.js';

export default async function updatePostController(req, res) {
  try {
    const { authorId, publicationId } = req.params;
    const post = req.body;

    const result = await update(authorId, +publicationId, post);

    return res.json({
      message: 'Post atualizado com sucesso!',
      post: result,
    });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return res.status(500).json({ error: 'Erro ao atualizar post' });
  }
}
