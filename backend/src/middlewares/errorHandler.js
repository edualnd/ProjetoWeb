const errorsHandler = (error, req, res, next) => {
  console.log('----------Error Handler----------');

  const statusCode = error.status || 500;
  const message = error.message || 'Erro no servidor';
  console.log(statusCode, message);
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorsHandler;
