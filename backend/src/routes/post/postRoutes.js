import express from 'express';
import createPostController from '../../controllers/post/createPostController.js';
import updatePostController from '../../controllers/post/updatePostController.js';
import deletePostController from '../../controllers/post/deletePostController.js';
import getPostController from '../../controllers/post/getPostController.js';
import upload from '../../utils/multer/config.js';

const postRoutes = express.Router();

postRoutes.get('/list', getPostController);
postRoutes.post('/', upload.array('photos', 2), createPostController);
postRoutes.put('/:publicationId', updatePostController);
postRoutes.delete('/:publicationId', deletePostController);
export default postRoutes;
