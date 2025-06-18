import { getEventList } from "../../model/postModel.js";
import { getEventUserList } from "../../model/postModel.js";

export default async function getEventController(req, res, next) {
  try {
    const result = await getEventList();
    return res.json(result);
  } catch (error) {
    console.error('Erro ao listar eventos', error);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
}


export async function getEventUserController(req, res, next) {
  try {
    const result = await getEventUserList(authorId);
    return res.json(result);
  } catch (error) {
    console.error('Erro ao listar eventos', error);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
}
