import { z } from 'zod';

export const registerSchema = z.object({
	firstName: z.string().min(1, {message: 'Firstname is required'}),
	lastName: z.string().min(1, {message: 'Lastname is required'}),
	email: z.string().email({ message: 'Ungültige Email' }),
	password: z.string()
});
export type RegisterSchema = typeof registerSchema;
