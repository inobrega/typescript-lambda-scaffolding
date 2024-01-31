import validator from '@middy/validator';
import { createUserSchema } from '@/app/src/shared/validations/createUserSchema';
import { getUserSchema } from '@/app/src/shared/validations/getUserSchema';
import { updateUserSchema } from '@/app/src/shared/validations/updateUserSchema';
import { deleteUserSchema } from '@/app/src/shared/validations/deleteUserSchema';
import { APIGatewayProxyHandler } from "aws-lambda";
import { Container } from "typedi";
import { ConfigService } from "@/app/src/shared/services/ConfigService";

export const dynamicValidator = (event: APIGatewayProxyHandler) => {
  let schema;
  const httpMethod = Container.get(ConfigService).get('httpMethod');

  switch (httpMethod) {
  case 'POST':
    schema = createUserSchema;
    break;
  case 'GET':
    schema = getUserSchema;
    break;
  case 'PUT':
    schema = updateUserSchema;
    break;
  case 'DELETE':
    schema = deleteUserSchema;
    break;
  default:
    throw new Error(`Unsupported method: ${httpMethod}`);
  }

  return validator({ eventSchema: schema } );
};
