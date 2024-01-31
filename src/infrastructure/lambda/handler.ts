import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import setupDependencies from '@/app/src/shared/utilities/dependencyInjector';
import { routeRequest } from './router';
import { dynamicValidator } from '@/app/src/infrastructure/middleware/dynamicValidatorMiddleware';
import logger from '@/app/src/shared/utilities/logger';
import { Container } from 'typedi';
import { ConfigService } from '@/app/src/shared/services/ConfigService';
import errorHandlingMiddleware from '@/app/src/shared/middleware/errorHandling';
import dbConnectionMiddleware from '@/app/src/shared/middleware/dbConnectionMiddleware';

setupDependencies();

const setTenant = (event: APIGatewayProxyEvent): void => {
  const tenant = event.requestContext.authorizer?.claims['custom:tenant'];
  Container.get(ConfigService).set('tenant', tenant);
};

const setHttpMethod = (event: APIGatewayProxyEvent): void => {
  const httpMethod = event.httpMethod;
  Container.get(ConfigService).set('httpMethod', httpMethod);
};

const baseHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  logger.info('Handler invoked', { path: event.path, method: event.httpMethod });
  setTenant(event);
  setHttpMethod(event);
  return routeRequest(event);
};

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(dbConnectionMiddleware)
  .use(errorHandlingMiddleware)
  .use(dynamicValidator(baseHandler));

export { handler };
