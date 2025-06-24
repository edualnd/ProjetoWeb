import { create } from '../../model/postModel.js';
import postSchema from '../../schemas/postSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import { uploadCloud, uploadVideo } from '../../utils/cloudinary/config.js';

export default async function createPostController(req, res, next) {
  try {
    const photo = req.files;
    const photoId = [];
    const user = req.user.userId;
    const post = { ...req.body, authorId: user };
    const { text } = req.body;

    const { success, error, data } = await validateSchema(postSchema, {
      text,
    });

    let cloudImage;
    if (photo) {
      for (const p of photo) {
        if (p.mimetype.startsWith('image/')) {
          cloudImage = await uploadCloud(p.path);
        } else if (p.mimetype.startsWith('video/')) {
          cloudImage = await uploadVideo(p.path);
        }

        if (!cloudImage) {
          return res.status(500).json({ error: error });
        }

        photoId.push(cloudImage.public_id + '.' + cloudImage.format);
      }
    }

    if (!success) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: 'Dados invalidos', error: error });
    }

    let images = {};

    if (photo && photoId.length == 2) {
      images = { image: photoId[0], video: photoId[1] };
    } else if (photo && photoId.length == 1) {
      images = { image: photoId[0] };
    }

    const result = await create({ ...post, ...images });
    console.log(result);
    return res.status(200).json({
      success: true,
      message: 'Post criado com sucesso!',
      post: result,
    });
  } catch (error) {
    console.log('Erro ao criar o post:', error);
    return res.status(500).json({ error: error.message });
  }
}
