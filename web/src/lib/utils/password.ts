import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
	return await hash(password, 12);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
	return await compare(password, hash);
}
