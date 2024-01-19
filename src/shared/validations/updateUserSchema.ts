import { z } from 'zod';

const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    password: z.string().min(6).optional()
  }),
  params: z.object({
    id: z.string().uuid()
  })
});

export { updateUserSchema };
