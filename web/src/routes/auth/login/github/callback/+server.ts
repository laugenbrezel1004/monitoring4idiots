import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import { github } from '$lib/server/oauth';
import { error, type RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { createUserByProvider, getUserByProvider } from '$lib/server/data/user';
import type { User } from '@prisma/client';
import { redirect } from 'sveltekit-flash-message/server';
import { m as messages } from '$lib/i18n/messages';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (code === null || state === null || storedState === null)
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
		tokens = await github.validateAuthorizationCode(code);
	} catch (err) {
		console.error(err);
		return redirect(
			302,
			'/auth/login',
			{ type: 'error', message: messages['auth.error.invalid-credentials']() },
			event
		);
	}
	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const emailResponse = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});

	const emails = await emailResponse.json();
	type GitHubEmail = {
		primary: boolean;
		verified: boolean;
		email: string;
	};
	const email: GitHubEmail | null = emails.find((email: GitHubEmail) => email.primary) || null;
	if (!email) return error(400, messages['auth.error.no-email']());

	const githubUser = await githubUserResponse.json();
	const githubUserId: number = githubUser.id;

	const existingUser = await getUserByProvider('github', String(githubUserId));
	if (existingUser) {
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
		user = await createUserByProvider(email.email, email.verified, 'github', String(githubUserId));
		if (!user) error(500, { message: messages['auth.error.unexpected']() });
	} catch (err) {
		console.error(err);
		return error(500, { message: messages['auth.error.unexpected']() });
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return redirect(
		302,
		'/app',
		{ type: 'success', message: messages['auth.success.first-login']() },
		event
	);
}
