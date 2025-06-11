import { createEvent } from "../../model/postModel.js";

export default async function createEventController(req, res) {
  try{
    console.log('user')
    const user = req.user.userId;
    const role = req.user.userRole;
    const {isEvent} = req.body;
    const post = { ...req.body,  authorId: user};

    if(isEvent == true && role != "COMMOM"){
    const result = await createEvent(post);
    return res.json({
      message: 'Evento criado com sucesso!',
      post: result,
    });
  }
  return res.status(200).json({message: 'voce não e um profissional'});

  }catch(error){
    console.log('Erro ao criar o evento:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
