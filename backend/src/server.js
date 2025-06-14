import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import deviceIdGenerator from './middlewares/deviceIdMiddleware.js';
import visitorRoutes from './routes/visitorRouter.js';
import userRoutes from './routes/userRouter.js';
import postRoutes from './routes/post/postRoutes.js';
import eventRoutes from './routes/event/eventRoutes.js';
import checkAccessTokenMiddleware from './middlewares/checkAccessTokenMiddleware.js';

import followRoutes from './routes/followRouter.js';

import commentRoutes from './routes/commentRoutes.js';
import logger from './middlewares/logger.js';
import errorsHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//app.use(logger);
app.use(deviceIdGenerator);

app.use('/', visitorRoutes);

//verificação
app.use('/auth', checkAccessTokenMiddleware);

app.get('/auth', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'logado',
  });
});

app.use('/auth/user', userRoutes);

app.use('/auth/post', postRoutes);

app.use('/auth/follow', followRoutes);

app.use('/auth/event/', eventRoutes);

app.use('/auth/comments/', commentRoutes);

app.use(errorsHandler);
app.listen(PORT, (req, res) => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
