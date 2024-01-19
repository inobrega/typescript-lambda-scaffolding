import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(6)
  })
});

export { createUserSchema };
