import { DatabaseConnection } from '@/app/src/infrastructure/db/DatabaseConnection';
import { MiddlewareObj } from '@middy/core';
import { Container } from 'typedi';

const dbConnectionMiddleware: MiddlewareObj = {
  before: async (handler) => {
    const dbConnection = Container.get(DatabaseConnection);
    await dbConnection.connect();
  },
  after: async (handler) => {
    const dbConnection = Container.get(DatabaseConnection);
    await dbConnection.disconnect();
  },
  onError: async (handler) => {
    const dbConnection = Container.get(DatabaseConnection);
    await dbConnection.disconnect();
  }
};

export default dbConnectionMiddleware;
