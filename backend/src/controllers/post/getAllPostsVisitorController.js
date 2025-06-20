import { getAllPostsVisitor } from '../../model/postModel.js';

export default async function getAllPostsVisitorController(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const { isEvent, search } = req.query;
    
    const result = await getAllPostsVisitor(
      Number(page), 
      Number(limit),
      isEvent ? isEvent === 'true' : undefined,
      search
    );
    
    if (result.posts.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Nenhuma publicação encontrada',
        pagination: result.pagination
      });
    }
    
    return res.status(200).json({
      success: true,
      data: result.posts,
      pagination: result.pagination
    });
    
  } catch (error) {
    console.error('Erro ao buscar publicações:', error);
    
    let statusCode = 500;
    let errorMessage = 'Erro interno ao buscar publicações';
    
    if (error.message.includes('Parâmetros de paginação inválidos')) {
      statusCode = 400;
      errorMessage = 'Parâmetros de paginação inválidos';
    }
    
    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}