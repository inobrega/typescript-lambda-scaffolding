import validator from '@middy/validator';
import { createUserSchema } from '@/app/src/shared/validations/createUserSchema';
import { getUserSchema } from '@/app/src/shared/validations/getUserSchema';
import { updateUserSchema } from '@/app/src/shared/validations/updateUserSchema';
import { deleteUserSchema } from '@/app/src/shared/validations/deleteUserSchema';

export const dynamicValidator = (event) => {
  let schema;

  switch (event.httpMethod) {
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
    throw new Error(`Unsupported method: ${event.httpMethod}`);
  }

  return validator({ eventSchema: schema } );
};
