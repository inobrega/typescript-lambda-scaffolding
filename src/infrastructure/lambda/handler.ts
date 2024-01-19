import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { APIGatewayProxyHandler } from 'aws-lambda';
import setupDependencies from '@/app/src/shared/utilities/dependencyInjector';
import { routeRequest } from './router';
import { dynamicValidator } from '@/app/src/infrastructure/middleware/dynamicValidatorMiddleware';
import logger from '@/app/src/shared/utilities/logger';

setupDependencies();

const baseHandler: APIGatewayProxyHandler = async (event) => {
  logger.info('Handler invoked', { path: event.path, method: event.httpMethod });
  return routeRequest(event);
};

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .use(dynamicValidator(baseHandler));

export { handler };
