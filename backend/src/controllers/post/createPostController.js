import { create } from "../../model/postModel.js";

export default async function createPostController(req, res){
        const user = req.user.userId
        console.log(user)

        const post = {...req.body, authorId: user}

        const result = await create(post)
        return res.json({
            message: "Post criado com sucesso!",
            post: result
        })
}