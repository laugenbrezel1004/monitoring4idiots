import type { Account, User } from '@prisma/client';
import { prisma } from '$lib/server/prisma';

export async function getUserByProvider(
	provider: string,
	providerAccountId: string
): Promise<(User & { accounts: Account[] }) | null> {
	const account: { userId: string } | null = await prisma.account.findFirst({
		where: {
			provider,
			providerAccountId
		},
		select: {
			userId: true
		}
	});
	if (!account || !account.userId) return null;
	return prisma.user.findUnique({
		where: {
			id: account.userId
		},
		include: {
			accounts: true
		}
	});
}

export async function createUserByProvider(
	email: string,
	emailVerified: boolean,
	name: string,
	provider: string,
	providerAccountId: string,
	password?: string
): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: {
			email
		},
		include: {
			accounts: true
		}
	});
	if (!user) {
		return prisma.user.create({
			data: {
				email,
				emailVerified,
				name,
				password: password ? password : null,
				accounts: {
					create: {
						provider,
						providerAccountId
					}
				}
			}
		});
	} else {
		if (provider === 'credentials') {
			if (user.accounts.length > 0) throw new Error('ALREADY_OAUTH');
			await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					password
				}
			});
		}
		await prisma.account.create({
			data: {
				provider,
				providerAccountId,
				userId: user.id
			}
		});
		return user;
	}
}

export async function getUserById(id: string): Promise<User | null> {
	return prisma.user.findUnique({
		where: {
			id
		}
	});
}

export async function getUserByEmail(email: string): Promise<User | null> {
	return prisma.user.findUnique({
		where: {
			email
		},
		include: {
			accounts: true
		}
	});
}
