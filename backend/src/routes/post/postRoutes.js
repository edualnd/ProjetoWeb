import express from 'express';
import createPostController from '../../controllers/post/createPostController.js';


const postRoutes = express.Router()

postRoutes.post('/', createPostController)
export default postRoutes;