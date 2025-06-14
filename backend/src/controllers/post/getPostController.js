import { getList } from '../../model/postModel.js';

export default async function getPostController(req, res, next) {
  try {
    const result = await getList();
    return res.json(result);
  } catch (error) {
    console.error('Erro ao listar publicações', error);
    return res.status(500).json({ error: 'Erro ao buscar publicações' });
  }
}
