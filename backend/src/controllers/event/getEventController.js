import { getEventList } from '../../model/postModel.js';
import { getCloserEvent } from '../../model/postModel.js';

export default async function getEventController(req, res, next) {
  try {
    const result = await getEventList();
    return res
      .status(200)
      .json({ success: true, message: 'Posts pegos', posts: result });
  } catch (error) {
    console.error('Erro ao listar eventos', error);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
}

export async function getCloserEventController(req, res, next) {
  try {
    const result = await getCloserEvent();
    return res
      .status(200)
      .json({ success: true, message: 'Eventos listados', posts: result });
  } catch (error) {
    console.error('Erro ao listar eventos', error);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
}
