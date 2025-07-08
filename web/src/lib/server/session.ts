import { encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { RequestEvent } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import type { Session, User } from '@prisma/client';

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	try {
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
		const session: Session | null = await prisma.session.findUnique({
			where: {
				id: sessionId
			}
		});

		if (!session) return { session: null, user: null };

		// Check if session is expired
		if (Date.now() >= session.expiresAt.getTime()) {
			await invalidateSession(sessionId);
			return { session: null, user: null };
		}

		if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
			await prisma.session.update({
				where: {
					id: sessionId
				},
				data: {
					expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
				}
			});
		}

		const user: User | null = await prisma.user.findUnique({
			where: {
				id: session.userId
			}
		});

		return { session, user };
	} catch (err) {
		console.error(err);
		return { session: null, user: null };
	}
}

export async function invalidateSession(sessionId: string) {
	await prisma.session.delete({
		where: {
			id: sessionId
		}
	});
}

export async function invalidateUserSessions(userId: string) {
	await prisma.session.deleteMany({
		where: {
			userId
		}
	});
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: !dev,
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: !dev,
		sameSite: 'lax',
		maxAge: 0
	});
}

export function generateSessionToken() {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	return encodeBase32(tokenBytes).toLowerCase();
}

export function createSession(token: string, userId: string): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	return prisma.session.create({
		data: {
			id: sessionId,
			userId,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
		}
	});
}

type SessionValidationResult = { session: Session | null; user: User | null };
