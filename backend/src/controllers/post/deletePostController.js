import { deletePost } from '../../model/postModel.js';
import { deleteFromCloud, deleteVideo } from '../../utils/cloudinary/config.js';

export default async function deletePostController(req, res, next) {
  try {
    const user = req.user.userId;
    const { publicationId } = req.params;

    const result = await deletePost(user, +publicationId);

    if (result.image) {
      const idFile = result.image.split('.');
      let id;
      if (idFile[0].startsWith('videos/')) {
        id = idFile[0];
        await deleteVideo(id);
      } else {
        id = idFile[0];
        await deleteFromCloud(id);
      }

      console.log(id, idFile, result.video, result.image);
      await deleteFromCloud(id);
    }
    if (result.video) {
      const idFile = result.video.split('.');
      let id;
      if (idFile[0].startsWith('videos/')) {
        id = idFile[0];
        await deleteVideo(id);
      } else {
        id = idFile[0];
        await deleteFromCloud(id);
      }
      console.log(id, idFile, result.video, result.image);
    }

    return res.status(200).json({
      success: true,
      message: 'Post deletado com sucesso!',
      deletedPost: result,
    });
  } catch (error) {
    console.log('Erro ao deletar post:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
