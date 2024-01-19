import { MiddlewareObj } from '@middy/core';

const errorHandlingMiddleware: { onError: (handler, next) => MiddlewareObj } = {
  onError: (handler, next) => {
    console.error(handler.error); // Log do erro para debugging
    handler.response = {
      statusCode: handler.error.statusCode || 500,
      body: JSON.stringify({ message: handler.error.message || 'Erro interno do servidor' })
    };
    return next();
  }
};

export default errorHandlingMiddleware;
