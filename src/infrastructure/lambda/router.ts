import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Container } from 'typedi';
import { CreateUser } from '@/app/src/application/use_cases/CreateUser';
import { GetUser } from '@/app/src/application/use_cases/GetUser';
import { UpdateUser } from '@/app/src/application/use_cases/UpdateUser';
import { DeleteUser } from '@/app/src/application/use_cases/DeleteUser';
import logger from '@/app/src/shared/utilities/logger';

export const routeRequest = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path, body } = event;
  const userId = path.split('/').pop() as string;
  const eventBody = (body) ? JSON.parse(body) : '';

  logger.info('Received request: ', { path: event.path, method: event.httpMethod });

  switch (httpMethod) {
  case 'POST': {
    const createUser = Container.get(CreateUser);
    return {
      statusCode: 201,
      body: JSON.stringify(await createUser.execute(JSON.parse(eventBody))),
    };
  }

  case 'GET': {
    const getUser = Container.get(GetUser);
    return {
      statusCode: 200,
      // body: JSON.stringify(await getUser.byId(userId)),
      body: JSON.stringify({ teste: true }),
    };
  }

  case 'PUT': {
    const updateUser = Container.get(UpdateUser);
    return {
      statusCode: 200,
      body: JSON.stringify(await updateUser.execute(userId, JSON.parse(eventBody))),
    };
  }

  case 'DELETE': {
    const deleteUser = Container.get(DeleteUser);
    await deleteUser.execute(userId);
    return {
      statusCode: 204,
      body: '',
    };
  }

  default:
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};
