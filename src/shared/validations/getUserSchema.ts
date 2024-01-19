import { z } from 'zod';

const getUserSchema = z.object({
  params: z.object({
    id: z.string().uuid()
  })
});

export { getUserSchema };
