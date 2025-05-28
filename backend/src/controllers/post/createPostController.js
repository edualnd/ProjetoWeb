import { create } from "../../model/postModel.js";

export default async function createPostController(req, res){
  
        const post = req.body

        const result = await create(post)
        return res.json({
            message: "Post criado com sucesso!",
            post: result
        })
}