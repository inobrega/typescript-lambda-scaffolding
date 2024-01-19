import { MiddlewareObj, Request } from '@middy/core';
import logger from '@/app/src/shared/utilities/logger';
import UserNotFoundException from '@/app/src/shared/exceptions/UserNotFoundException';
import FeatureNotEnabledException from '@/app/src/shared/exceptions/FeatureNotEnabledException';

const errorHandlingMiddleware: MiddlewareObj = {
  onError: (request: Request) => {
    const { error, response } = request;

    if (error instanceof UserNotFoundException) {
      response.statusCode = 404;
      logger.error('UserService error: UserNotFoundException', error);
    } else if(error instanceof FeatureNotEnabledException) {
      response.statusCode = 403;
      logger.error('FeatureNotEnabledException', error);
    } else {
      response.statusCode = 500;
    }
    response.body = JSON.stringify({ message: error.message || 'Erro interno do servidor' });
  }
};

export default errorHandlingMiddleware;
