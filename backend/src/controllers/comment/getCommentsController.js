import { getComment } from "../../model/commentModel.js";

const getCommentsController = async (req, res, next) => {
  try {
    const postId = req.params.postId
    const comments = await getComment(+postId)

    if(!comments){
      throw new Error()
    }

    return res.status(200).json({
      success: true,
      message: `Comentarios do post ${postId}`,
      comments
    })
  } catch (e) {
    next(e);
  }
};

export default getCommentsController;
