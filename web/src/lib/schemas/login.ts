import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: 'Ungültige Email' }),
	password: z.string()
});
export type LoginSchema = typeof loginSchema;
