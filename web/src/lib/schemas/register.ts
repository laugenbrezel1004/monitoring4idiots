import { z } from 'zod';

export const registerSchema = z.object({
	email: z.string().email({ message: 'Ungültige Email' }),
	password: z.string()
});
export type RegisterSchema = typeof registerSchema;
