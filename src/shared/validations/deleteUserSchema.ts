import { z } from 'zod';

const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().uuid()
  })
});

export { deleteUserSchema };
