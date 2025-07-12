import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import { google } from '$lib/server/oauth';
import { error, type RequestEvent } from '@sveltejs/kit';
import { decodeIdToken, type OAuth2Tokens } from 'arctic';
import { createUserByProvider, getUserByProvider } from '$lib/server/data/user';
import type { User } from '@prisma/client';
import { redirect } from 'sveltekit-flash-message/server';
import { m as messages } from '$lib/i18n/messages';
import {prisma} from "$lib/server/prisma";

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;

	if (code === null || state === null || storedState === null || codeVerifier === null)
		return redirect(
			302,
			'/auth/login',
			{ type: 'error', message: messages['auth.error.unexpected']() },
			event
		);
	if (state !== storedState)
		return redirect(
			302,
			'/auth/login',
			{ type: 'error', message: messages['auth.error.unexpected']() },
			event
		);

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (err) {
		console.error(err);
		return redirect(
			302,
			'/auth/login',
			{
				type: 'error',
				message: messages['auth.error.invalid-credentials']()
			},
			event
		);
	}

	const claims: any = decodeIdToken(tokens.idToken());
	const googleUserId = claims.sub as string;
	const email = claims.email as string;
	const emailVerified = claims.email_verified as boolean;

	const existingUser = await getUserByProvider('google', googleUserId);
	if (existingUser) {
		await prisma.user.update({
			where: {
				id: existingUser.id,
			},
			data: {
				name: claims.name,
				avatarUrl: claims.picture,
			}
		});

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return redirect(
			302,
			'/app',
			{ type: 'success', message: messages['auth.success.login']() },
			event
		);
	}

	let user: User | null;
	try {
		user = await createUserByProvider(email, emailVerified, claims.name, 'google', String(googleUserId));
		if (!user) error(500, { message: messages['auth.error.unexpected']() });
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				avatarUrl: claims.picture,
			}
		});
	} catch (err) {
		console.error(err);
		return error(500, { message: messages['auth.error.unexpected']() });
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user!.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return redirect(
		302,
		'/app',
		{ type: 'success', message: messages['auth.success.first-login']() },
		event
	);
}
